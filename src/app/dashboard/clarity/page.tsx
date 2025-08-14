import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import ClarityView from '@/components/clarity-view'

export default async function ClarityPage() {
  const { userId } = await auth()
  
  if (!userId) return null

  const user = await db.user.findUnique({
    where: { clerkId: userId }
  })

  if (!user) return null

  // Get all upcoming tasks across all streams
  const upcomingTasks = await db.task.findMany({
    where: {
      userId: user.id,
      status: { in: ['TODO', 'IN_PROGRESS'] },
      dueDate: { not: null }
    },
    include: {
      stream: true
    },
    orderBy: [
      { dueDate: 'asc' },
      { priority: 'desc' }
    ]
  })

  // Get overdue tasks
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const overdueTasks = await db.task.findMany({
    where: {
      userId: user.id,
      status: { in: ['TODO', 'IN_PROGRESS'] },
      dueDate: { lt: today }
    },
    include: {
      stream: true
    },
    orderBy: [
      { dueDate: 'asc' },
      { priority: 'desc' }
    ]
  })

  // Get completed tasks from the last 7 days
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  
  const recentCompletions = await db.task.findMany({
    where: {
      userId: user.id,
      status: 'DONE',
      completedAt: { gte: weekAgo }
    },
    include: {
      stream: true
    },
    orderBy: {
      completedAt: 'desc'
    }
  })

  return (
    <ClarityView 
      upcomingTasks={upcomingTasks}
      overdueTasks={overdueTasks}
      recentCompletions={recentCompletions}
    />
  )
}
