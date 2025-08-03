"usimport { platformKit } from '@/lib/pg-meta/platform-kit' client"

import React, { useState, useEffect } from "react"
import { platformKit } from "@/lib/pg-meta/platform-kit"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, Play, Square, Trash2 } from "lucide-react"

interface RealtimeEvent {
  id: string
  timestamp: Date
  table: string
  event: "INSERT" | "UPDATE" | "DELETE"
  data: Record<string, unknown>
}

export function RealtimeMonitor() {
  const [events, setEvents] = useState<RealtimeEvent[]>([])
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [tableName, setTableName] = useState("")
  const [subscription, setSubscription] = useState<ReturnType<
    typeof platformKit.subscribeToTable
  > | null>(null)

  const startMonitoring = () => {
    if (!tableName) return

    const sub = platformKit.subscribeToTable(tableName, (payload) => {
      const newEvent: RealtimeEvent = {
        id: Math.random().toString(36),
        timestamp: new Date(),
        table: tableName,
        event: payload.eventType,
        data: payload.new || payload.old || {},
      }
      setEvents((prev) => [newEvent, ...prev.slice(0, 99)]) // Keep last 100 events
    })

    setSubscription(sub)
    setIsMonitoring(true)
  }

  const stopMonitoring = () => {
    if (subscription) {
      subscription.unsubscribe()
      setSubscription(null)
    }
    setIsMonitoring(false)
  }

  const clearEvents = () => {
    setEvents([])
  }

  useEffect(() => {
    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [subscription])

  const getEventColor = (event: string) => {
    switch (event) {
      case "INSERT":
        return "bg-green-100 text-green-800"
      case "UPDATE":
        return "bg-blue-100 text-blue-800"
      case "DELETE":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5" />
          Real-time Database Monitor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Table name to monitor"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            disabled={isMonitoring}
          />
          {!isMonitoring ? (
            <Button onClick={startMonitoring} disabled={!tableName}>
              <Play className="mr-2 h-4 w-4" />
              Start
            </Button>
          ) : (
            <Button onClick={stopMonitoring} variant="destructive">
              <Square className="mr-2 h-4 w-4" />
              Stop
            </Button>
          )}
          <Button onClick={clearEvents} variant="outline">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>

        {isMonitoring && (
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-600">
              Monitoring {tableName} for changes...
            </span>
          </div>
        )}

        <ScrollArea className="h-96 w-full border rounded-md p-4">
          {events.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No events yet. Start monitoring a table to see real-time changes.
            </div>
          ) : (
            <div className="space-y-2">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border rounded-md p-3 bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getEventColor(event.event)}>
                        {event.event}
                      </Badge>
                      <span className="font-medium">{event.table}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {event.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                    {JSON.stringify(event.data, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="text-xs text-gray-500">
          Events are displayed in real-time. Maximum 100 events are kept in
          memory.
        </div>
      </CardContent>
    </Card>
  )
}
