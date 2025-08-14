'use client'

import { Stream, Task } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import AddStreamDialog from './add-stream-dialog'
import StreamCard from './stream-card'

type StreamWithTasks = Stream & {
  tasks: Task[]
  _count: {
    tasks: number
  }
}

interface StreamsViewProps {
  streams: StreamWithTasks[]
}

export default function StreamsView({ streams }: StreamsViewProps) {
  const [showAddStream, setShowAddStream] = useState(false)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-stone-900">Project Streams</h1>
          <p className="text-stone-600 mt-2">Organize your work into flowing, focused streams</p>
        </div>
        <Button onClick={() => setShowAddStream(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Stream
        </Button>
      </div>

      {/* Streams Grid */}
      {streams.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {streams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 mx-auto flex items-center justify-center">
            <Plus className="w-8 h-8 text-stone-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-stone-900">Create your first stream</h3>
            <p className="text-stone-600 max-w-md mx-auto">
              Streams help you organize related tasks and projects. Think of them as gentle containers for your work.
            </p>
          </div>
          <Button onClick={() => setShowAddStream(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Stream
          </Button>
        </div>
      )}

      {/* Add Stream Dialog */}
      <AddStreamDialog 
        open={showAddStream}
        onClose={() => setShowAddStream(false)}
      />
    </div>
  )
}
