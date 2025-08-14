import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import FocusDashboard from '@/components/focus-dashboard'

export default async function DashboardPage() {
  const { userId } = await auth()
  
  if (!userId) return null

  // Get user from database
  const user = await db.user.findUnique({
    where: { clerkId: userId }
  })

  if (!user) return null

  // Get today's priority task (highest priority task due today or overdue)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const priorityTask = await db.task.findFirst({
    where: {
      userId: user.id,
      status: { in: ['TODO', 'IN_PROGRESS'] },
      OR: [
        { dueDate: { gte: today, lt: tomorrow } },
        { dueDate: { lt: today } }
      ]
    },
    orderBy: [
      { dueDate: 'asc' },
      { priority: 'desc' },
      { createdAt: 'asc' }
    ],
    include: {
      stream: true
    }
  })

  // Get next 5 tasks
  const upNextTasks = await db.task.findMany({
    where: {
      userId: user.id,
      status: { in: ['TODO', 'IN_PROGRESS'] },
      NOT: priorityTask ? { id: priorityTask.id } : undefined
    },
    orderBy: [
      { dueDate: 'asc' },
      { priority: 'desc' },
      { createdAt: 'asc' }
    ],
    take: 5,
    include: {
      stream: true
    }
  })

  // Get week ahead tasks (next 7 days)
  const nextWeek = new Date(tomorrow)
  nextWeek.setDate(nextWeek.getDate() + 6)

  const weekAheadTasks = await db.task.findMany({
    where: {
      userId: user.id,
      status: { in: ['TODO', 'IN_PROGRESS'] },
      dueDate: { gte: tomorrow, lte: nextWeek }
    },
    orderBy: [
      { dueDate: 'asc' },
      { priority: 'desc' }
    ],
    include: {
      stream: true
    }
  })

  return (
    <FocusDashboard 
      priorityTask={priorityTask}
      upNextTasks={upNextTasks}
      weekAheadTasks={weekAheadTasks}
    />
  )
}
