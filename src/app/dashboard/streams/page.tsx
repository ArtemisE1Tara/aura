import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import StreamsView from '@/components/streams-view'

export default async function StreamsPage() {
  const { userId } = await auth()
  
  if (!userId) return null

  const user = await db.user.findUnique({
    where: { clerkId: userId }
  })

  if (!user) return null

  // Get all streams with their tasks
  const streams = await db.stream.findMany({
    where: {
      userId: user.id
    },
    include: {
      tasks: {
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'desc' }
        ]
      },
      _count: {
        select: {
          tasks: {
            where: {
              status: { not: 'DONE' }
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  return <StreamsView streams={streams} />
}
