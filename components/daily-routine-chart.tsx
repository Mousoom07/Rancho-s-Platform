"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Clock, Plus, Trash2, Edit, Save, X } from "lucide-react"

interface RoutineItem {
  id: string
  time: string
  activity: string
  description: string
  category: string
}

const categories = [
  "Work",
  "Study", 
  "Exercise",
  "Meals",
  "Sleep",
  "Personal",
  "Social",
  "Hobbies"
]

export function DailyRoutineChart() {
  const [routine, setRoutine] = useState<RoutineItem[]>([
    {
      id: "1",
      time: "06:00",
      activity: "Morning Exercise",
      description: "30 minutes of cardio and stretching",
      category: "Exercise"
    },
    {
      id: "2", 
      time: "08:00",
      activity: "Breakfast",
      description: "Healthy breakfast with protein and fruits",
      category: "Meals"
    },
    {
      id: "3",
      time: "09:00",
      activity: "Work/Study Session",
      description: "Focus on important tasks and projects",
      category: "Work"
    }
  ])

  const [newItem, setNewItem] = useState<Omit<RoutineItem, 'id'>>({
    time: "",
    activity: "",
    description: "",
    category: "Work"
  })

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<RoutineItem | null>(null)

  const addItem = () => {
    if (newItem.time && newItem.activity) {
      const newRoutineItem: RoutineItem = {
        ...newItem,
        id: Date.now().toString()
      }
      setRoutine([...routine, newRoutineItem])
      setNewItem({
        time: "",
        activity: "",
        description: "",
        category: "Work"
      })
    }
  }

  const deleteItem = (id: string) => {
    setRoutine(routine.filter(item => item.id !== id))
  }

  const startEditing = (item: RoutineItem) => {
    setEditingId(item.id)
    setEditForm({ ...item })
  }

  const saveEdit = () => {
    if (editForm) {
      setRoutine(routine.map(item => 
        item.id === editingId ? editForm : item
      ))
      setEditingId(null)
      setEditForm(null)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Work": "bg-blue-600",
      "Study": "bg-green-600", 
      "Exercise": "bg-red-600",
      "Meals": "bg-yellow-600",
      "Sleep": "bg-purple-600",
      "Personal": "bg-pink-600",
      "Social": "bg-indigo-600",
      "Hobbies": "bg-orange-600"
    }
    return colors[category] || "bg-gray-600"
  }

  const sortedRoutine = [...routine].sort((a, b) => a.time.localeCompare(b.time))

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Daily Routine Chart</h2>
        <p className="text-gray-300">Plan and track your daily activities for better productivity and work-life balance</p>
      </div>

      {/* Add New Routine Item */}
      <Card className="bg-black/50 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="time" className="text-white">Time</Label>
              <Input
                id="time"
                type="time"
                value={newItem.time}
                onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="activity" className="text-white">Activity</Label>
              <Input
                id="activity"
                placeholder="Activity name"
                value={newItem.activity}
                onChange={(e) => setNewItem({ ...newItem, activity: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="category" className="text-white">Category</Label>
              <select
                id="category"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={addItem}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="description" className="text-white">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add details about this activity..."
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Routine Timeline */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Your Daily Schedule</h3>
        
        {sortedRoutine.length === 0 ? (
          <Card className="bg-black/50 backdrop-blur-lg border-white/10">
            <CardContent className="p-8 text-center">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300">No activities added yet. Start building your daily routine!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {sortedRoutine.map((item) => (
              <Card key={item.id} className="bg-black/50 backdrop-blur-lg border-white/10">
                <CardContent className="p-4">
                  {editingId === item.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-white">Time</Label>
                          <Input
                            type="time"
                            value={editForm?.time || ""}
                            onChange={(e) => setEditForm(editForm ? { ...editForm, time: e.target.value } : null)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Activity</Label>
                          <Input
                            value={editForm?.activity || ""}
                            onChange={(e) => setEditForm(editForm ? { ...editForm, activity: e.target.value } : null)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Category</Label>
                          <select
                            value={editForm?.category || ""}
                            onChange={(e) => setEditForm(editForm ? { ...editForm, category: e.target.value } : null)}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                          >
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <Label className="text-white">Description</Label>
                        <Textarea
                          value={editForm?.description || ""}
                          onChange={(e) => setEditForm(editForm ? { ...editForm, description: e.target.value } : null)}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={saveEdit} className="bg-green-600 hover:bg-green-500">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={cancelEdit} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-mono text-yellow-400 min-w-[80px]">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-lg font-semibold text-white">{item.activity}</h4>
                            <Badge className={`${getCategoryColor(item.category)} text-white`}>
                              {item.category}
                            </Badge>
                          </div>
                          {item.description && (
                            <p className="text-gray-300 text-sm">{item.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => startEditing(item)}
                          variant="outline" 
                          size="sm"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          onClick={() => deleteItem(item.id)}
                          variant="outline" 
                          size="sm"
                          className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {routine.length > 0 && (
        <Card className="bg-black/50 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Routine Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{routine.length}</div>
                <div className="text-sm text-gray-300">Total Activities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {new Set(routine.map(item => item.category)).size}
                </div>
                <div className="text-sm text-gray-300">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {routine.filter(item => item.category === "Work" || item.category === "Study").length}
                </div>
                <div className="text-sm text-gray-300">Productive Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {routine.filter(item => item.category === "Exercise" || item.category === "Sleep").length}
                </div>
                <div className="text-sm text-gray-300">Health Activities</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
