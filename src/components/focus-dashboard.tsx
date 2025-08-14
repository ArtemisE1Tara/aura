'use client'

import { Task, Stream } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Plus, Calendar, Clock } from 'lucide-react'
import TaskCard from '@/components/task-card'
import AddTaskDialog from '@/components/add-task-dialog'
import { useState } from 'react'

type TaskWithStream = Task & {
  stream: Stream | null
}

interface FocusDashboardProps {
  priorityTask: TaskWithStream | null
  upNextTasks: TaskWithStream[]
  weekAheadTasks: TaskWithStream[]
}

export default function FocusDashboard({ 
  priorityTask, 
  upNextTasks, 
  weekAheadTasks 
}: FocusDashboardProps) {
  const [showAddTask, setShowAddTask] = useState(false)

  // Group week ahead tasks by date
  const groupedWeekTasks = weekAheadTasks.reduce((groups, task) => {
    if (!task.dueDate) return groups
    
    const date = task.dueDate.toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(task)
    return groups
  }, {} as Record<string, TaskWithStream[]>)

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-light text-stone-900">Your Focus Space</h1>
        <p className="text-stone-600">What matters most today?</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Today's Priority */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-stone-900">Today&apos;s Priority</h2>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setShowAddTask(true)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {priorityTask ? (
              <div className="space-y-4">
                <TaskCard task={priorityTask} variant="priority" />
                <p className="text-sm text-stone-500 italic">
                  Focus on this one thing today
                </p>
              </div>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-100 mx-auto flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-stone-400" />
                </div>
                <p className="text-stone-500">No priority set for today</p>
                <Button 
                  size="sm" 
                  onClick={() => setShowAddTask(true)}
                >
                  Add Priority Task
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Up Next */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-stone-900">Up Next</h2>
              <span className="text-sm text-stone-500">{upNextTasks.length} tasks</span>
            </div>
            
            {upNextTasks.length > 0 ? (
              <div className="space-y-3">
                {upNextTasks.map((task) => (
                  <TaskCard key={task.id} task={task} variant="compact" />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-100 mx-auto flex items-center justify-center">
                  <Clock className="w-6 h-6 text-stone-400" />
                </div>
                <p className="text-stone-500">Your queue is empty</p>
                <p className="text-xs text-stone-400">A clear mind is a focused mind</p>
              </div>
            )}
          </div>
        </div>

        {/* Week Ahead */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-stone-900">Week Ahead</h2>
              <span className="text-sm text-stone-500">{weekAheadTasks.length} tasks</span>
            </div>
            
            {Object.keys(groupedWeekTasks).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(groupedWeekTasks).map(([date, tasks]) => (
                  <div key={date} className="space-y-2">
                    <h3 className="text-sm font-medium text-stone-700">
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </h3>
                    <div className="space-y-1">
                      {tasks.map((task) => (
                        <div key={task.id} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-stone-300"></div>
                          <span className="text-sm text-stone-600 truncate">{task.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-100 mx-auto flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-stone-400" />
                </div>
                <p className="text-stone-500">A peaceful week ahead</p>
                <p className="text-xs text-stone-400">No upcoming deadlines</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Task Dialog */}
      <AddTaskDialog 
        open={showAddTask}
        onClose={() => setShowAddTask(false)}
      />
    </div>
  )
}
