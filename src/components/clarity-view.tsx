'use client'

import { Task, Stream } from '@prisma/client'
import { Calendar, CheckCircle, AlertTriangle } from 'lucide-react'
import TaskCard from '@/components/task-card'

type TaskWithStream = Task & {
  stream: Stream | null
}

interface ClarityViewProps {
  upcomingTasks: TaskWithStream[]
  overdueTasks: TaskWithStream[]
  recentCompletions: TaskWithStream[]
}

export default function ClarityView({ 
  upcomingTasks, 
  overdueTasks, 
  recentCompletions 
}: ClarityViewProps) {
  
  // Group upcoming tasks by date
  const groupedUpcoming = upcomingTasks.reduce((groups, task) => {
    if (!task.dueDate) return groups
    
    const date = task.dueDate.toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(task)
    return groups
  }, {} as Record<string, TaskWithStream[]>)

  // Group recent completions by date
  const groupedCompletions = recentCompletions.reduce((groups, task) => {
    if (!task.completedAt) return groups
    
    const date = task.completedAt.toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(task)
    return groups
  }, {} as Record<string, TaskWithStream[]>)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-light text-stone-900">Clarity View</h1>
        <p className="text-stone-600">A gentle overview of your work landscape</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Overdue Tasks */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-medium text-stone-900">Needs Attention</h2>
            <span className="text-sm text-stone-500">({overdueTasks.length})</span>
          </div>
          
          {overdueTasks.length > 0 ? (
            <div className="space-y-3">
              {overdueTasks.map((task) => (
                <TaskCard key={task.id} task={task} variant="compact" />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-stone-200 p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-stone-600">All caught up!</p>
            </div>
          )}
        </div>

        {/* Upcoming Tasks */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-medium text-stone-900">Coming Up</h2>
            <span className="text-sm text-stone-500">({upcomingTasks.length})</span>
          </div>
          
          {Object.keys(groupedUpcoming).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(groupedUpcoming).map(([date, tasks]) => (
                <div key={date} className="space-y-2">
                  <h3 className="text-sm font-medium text-stone-700 sticky top-0 bg-stone-50 py-1">
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'short', 
                      day: 'numeric',
                      year: new Date(date).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                    })}
                  </h3>
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <TaskCard key={task.id} task={task} variant="compact" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-stone-200 p-6 text-center">
              <Calendar className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm text-stone-600">No upcoming deadlines</p>
              <p className="text-xs text-stone-400 mt-1">Enjoy the calm</p>
            </div>
          )}
        </div>

        {/* Recent Completions */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h2 className="text-lg font-medium text-stone-900">Recently Done</h2>
            <span className="text-sm text-stone-500">({recentCompletions.length})</span>
          </div>
          
          {Object.keys(groupedCompletions).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(groupedCompletions).map(([date, tasks]) => (
                <div key={date} className="space-y-2">
                  <h3 className="text-sm font-medium text-stone-700">
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'short',
                      month: 'short', 
                      day: 'numeric'
                    })}
                  </h3>
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <TaskCard key={task.id} task={task} variant="compact" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-stone-200 p-6 text-center">
              <CheckCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm text-stone-600">No recent completions</p>
              <p className="text-xs text-stone-400 mt-1">Start checking things off!</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-xl border border-stone-200 p-6">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-light text-red-600">{overdueTasks.length}</div>
            <div className="text-sm text-stone-600">Need attention</div>
          </div>
          <div>
            <div className="text-2xl font-light text-blue-600">{upcomingTasks.length}</div>
            <div className="text-sm text-stone-600">Coming up</div>
          </div>
          <div>
            <div className="text-2xl font-light text-green-600">{recentCompletions.length}</div>
            <div className="text-sm text-stone-600">Done this week</div>
          </div>
        </div>
      </div>
    </div>
  )
}
