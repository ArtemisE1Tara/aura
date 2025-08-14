'use server'

import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { TaskStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function updateTaskStatus(taskId: string, status: TaskStatus) {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId }
  })

  if (!user) {
    throw new Error('User not found')
  }

  await db.task.update({
    where: {
      id: taskId,
      userId: user.id
    },
    data: {
      status,
      completedAt: status === 'DONE' ? new Date() : null
    }
  })

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/streams')
  revalidatePath('/dashboard/clarity')
}

export async function createTask(data: {
  title: string
  notes?: string
  dueDate?: Date
  streamId?: string
  priority?: number
}) {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const task = await db.task.create({
    data: {
      title: data.title,
      notes: data.notes,
      dueDate: data.dueDate,
      streamId: data.streamId,
      priority: data.priority || 0,
      userId: user.id
    }
  })

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/streams')
  revalidatePath('/dashboard/clarity')

  return task
}

export async function createStream(data: {
  name: string
  description?: string
  color?: string
}) {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const stream = await db.stream.create({
    data: {
      name: data.name,
      description: data.description,
      color: data.color,
      userId: user.id
    }
  })

  revalidatePath('/dashboard/streams')

  return stream
}

export async function updateTask(taskId: string, data: {
  title?: string
  notes?: string
  dueDate?: Date
  streamId?: string
  priority?: number
}) {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId }
  })

  if (!user) {
    throw new Error('User not found')
  }

  await db.task.update({
    where: {
      id: taskId,
      userId: user.id
    },
    data
  })

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/streams')
  revalidatePath('/dashboard/clarity')
}

export async function deleteTask(taskId: string) {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId }
  })

  if (!user) {
    throw new Error('User not found')
  }

  await db.task.delete({
    where: {
      id: taskId,
      userId: user.id
    }
  })

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/streams')
  revalidatePath('/dashboard/clarity')
}
