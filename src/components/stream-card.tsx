'use client'

import { Stream, Task } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Plus, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import TaskCard from '@/components/task-card'
import AddTaskDialog from '@/components/add-task-dialog'
import { useState } from 'react'

type StreamWithTasks = Stream & {
  tasks: Task[]
  _count: {
    tasks: number
  }
}

interface StreamCardProps {
  stream: StreamWithTasks
}

export default function StreamCard({ stream }: StreamCardProps) {
  const [showAddTask, setShowAddTask] = useState(false)
  
  // Show only the first 3 tasks
  const visibleTasks = stream.tasks.slice(0, 3)
  const hasMoreTasks = stream.tasks.length > 3

  return (
    <>
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Stream Header */}
        <div className="p-6 border-b border-stone-100">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: stream.color || '#6B7280' }}
                />
                <h3 className="text-lg font-medium text-stone-900">{stream.name}</h3>
              </div>
              {stream.description && (
                <p className="text-sm text-stone-600">{stream.description}</p>
              )}
              <div className="flex items-center space-x-4 mt-3 text-xs text-stone-500">
                <span>{stream._count.tasks} active tasks</span>
                <span>{stream.tasks.length} total</span>
              </div>
            </div>
            <Button size="sm" variant="ghost" className="p-0 h-6 w-6">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tasks Preview */}
        <div className="p-6">
          {visibleTasks.length > 0 ? (
            <div className="space-y-3">
              {visibleTasks.map((task) => (
                <TaskCard key={task.id} task={{ ...task, stream }} variant="compact" />
              ))}
              
              {hasMoreTasks && (
                <div className="text-center pt-2">
                  <Link href={`/dashboard/streams/${stream.id}`}>
                    <Button variant="ghost" size="sm" className="text-stone-600">
                      View {stream.tasks.length - 3} more tasks
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 space-y-3">
              <div className="w-8 h-8 rounded-full bg-stone-100 mx-auto flex items-center justify-center">
                <Plus className="w-4 h-4 text-stone-400" />
              </div>
              <p className="text-sm text-stone-500">No tasks yet</p>
            </div>
          )}
        </div>

        {/* Add Task Button */}
        <div className="p-6 pt-0">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => setShowAddTask(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Add Task Dialog */}
      <AddTaskDialog 
        open={showAddTask}
        onClose={() => setShowAddTask(false)}
        streamId={stream.id}
      />
    </>
  )
}
