'use client'

import { Task, Stream, TaskStatus } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Check, Circle, Clock, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { updateTaskStatus } from '@/lib/actions'
import { useState } from 'react'

type TaskWithStream = Task & {
  stream: Stream | null
}

interface TaskCardProps {
  task: TaskWithStream
  variant?: 'default' | 'priority' | 'compact'
}

const statusIcons = {
  TODO: Circle,
  IN_PROGRESS: Clock,
  DONE: Check,
}

const statusColors = {
  TODO: 'text-stone-400',
  IN_PROGRESS: 'text-blue-500',
  DONE: 'text-green-500',
}

export default function TaskCard({ task, variant = 'default' }: TaskCardProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const StatusIcon = statusIcons[task.status]

  const handleStatusChange = async (newStatus: TaskStatus) => {
    setIsUpdating(true)
    try {
      await updateTaskStatus(task.id, newStatus)
    } finally {
      setIsUpdating(false)
    }
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'DONE'
  
  if (variant === 'compact') {
    return (
      <div className={cn(
        'flex items-center space-x-3 p-3 rounded-lg border transition-colors',
        task.status === 'DONE' ? 'bg-stone-50 border-stone-200' : 'bg-white border-stone-200 hover:border-stone-300'
      )}>
        <Button
          size="sm"
          variant="ghost"
          className="p-0 h-6 w-6"
          onClick={() => handleStatusChange(task.status === 'DONE' ? 'TODO' : 'DONE')}
          disabled={isUpdating}
        >
          <StatusIcon className={cn('w-4 h-4', statusColors[task.status])} />
        </Button>
        
        <div className="flex-1 min-w-0">
          <p className={cn(
            'text-sm truncate',
            task.status === 'DONE' ? 'text-stone-500 line-through' : 'text-stone-900'
          )}>
            {task.title}
          </p>
          {task.stream && (
            <p className="text-xs text-stone-500">{task.stream.name}</p>
          )}
        </div>

        {task.dueDate && (
          <div className={cn(
            'text-xs px-2 py-1 rounded-full',
            isOverdue ? 'bg-red-50 text-red-600' : 'bg-stone-100 text-stone-600'
          )}>
            {new Date(task.dueDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
        )}
      </div>
    )
  }

  if (variant === 'priority') {
    return (
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Button
            size="sm"
            variant="ghost"
            className="p-0 h-6 w-6 mt-1"
            onClick={() => handleStatusChange(task.status === 'DONE' ? 'TODO' : 'DONE')}
            disabled={isUpdating}
          >
            <StatusIcon className={cn('w-5 h-5', statusColors[task.status])} />
          </Button>
          
          <div className="flex-1 space-y-2">
            <h3 className={cn(
              'text-lg font-medium leading-relaxed',
              task.status === 'DONE' ? 'text-stone-500 line-through' : 'text-stone-900'
            )}>
              {task.title}
            </h3>
            
            {task.notes && (
              <p className="text-sm text-stone-600 leading-relaxed">
                {task.notes}
              </p>
            )}
            
            <div className="flex items-center space-x-4 text-xs text-stone-500">
              {task.stream && (
                <span className="flex items-center space-x-1">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: task.stream.color || '#6B7280' }}
                  />
                  <span>{task.stream.name}</span>
                </span>
              )}
              {task.dueDate && (
                <span className={cn(
                  isOverdue ? 'text-red-600 font-medium' : 'text-stone-500'
                )}>
                  Due {new Date(task.dueDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className={cn(
      'flex items-start space-x-3 p-4 rounded-lg border transition-colors',
      task.status === 'DONE' ? 'bg-stone-50 border-stone-200' : 'bg-white border-stone-200 hover:border-stone-300'
    )}>
      <Button
        size="sm"
        variant="ghost"
        className="p-0 h-6 w-6 mt-1"
        onClick={() => handleStatusChange(task.status === 'DONE' ? 'TODO' : 'DONE')}
        disabled={isUpdating}
      >
        <StatusIcon className={cn('w-4 h-4', statusColors[task.status])} />
      </Button>
      
      <div className="flex-1 min-w-0 space-y-1">
        <h4 className={cn(
          'font-medium',
          task.status === 'DONE' ? 'text-stone-500 line-through' : 'text-stone-900'
        )}>
          {task.title}
        </h4>
        
        {task.notes && (
          <p className="text-sm text-stone-600">
            {task.notes}
          </p>
        )}
        
        <div className="flex items-center space-x-4 text-xs text-stone-500">
          {task.stream && (
            <span className="flex items-center space-x-1">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: task.stream.color || '#6B7280' }}
              />
              <span>{task.stream.name}</span>
            </span>
          )}
          {task.dueDate && (
            <span className={cn(
              isOverdue ? 'text-red-600 font-medium' : 'text-stone-500'
            )}>
              {new Date(task.dueDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          )}
        </div>
      </div>

      <Button size="sm" variant="ghost" className="p-0 h-6 w-6">
        <MoreHorizontal className="w-4 h-4" />
      </Button>
    </div>
  )
}
