"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export function RoomManager() {
  const [rooms, setRooms] = useState([])
  const [users, setUsers] = useState([])
  const [newRoomName, setNewRoomName] = useState("")
  const [selectedRoom, setSelectedRoom] = useState("")
  const [selectedUsers, setSelectedUsers] = useState([])

  useEffect(() => {
    fetchRooms()
    fetchUsers()
  }, [])

  const fetchRooms = async () => {
    const response = await fetch("/api/rooms")
    if (response.ok) {
      const data = await response.json()
      setRooms(data.rooms)
    }
  }

  const fetchUsers = async () => {
    const response = await fetch("/api/users")
    if (response.ok) {
      const data = await response.json()
      setUsers(data.users)
    }
  }

  const handleCreateRoom = async () => {
    if (!newRoomName) {
      toast({
        title: "Error",
        description: "Room name is required",
        variant: "destructive",
      })
      return
    }

    const response = await fetch("/api/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newRoomName }),
    })

    if (response.ok) {
      toast({
        title: "Success",
        description: "Room created successfully",
      })
      setNewRoomName("")
      fetchRooms()
    } else {
      toast({
        title: "Error",
        description: "Failed to create room",
        variant: "destructive",
      })
    }
  }

  const handleAssignUsers = async () => {
    if (!selectedRoom || selectedUsers.length === 0) {
      toast({
        title: "Error",
        description: "Please select a room and at least one user",
        variant: "destructive",
      })
      return
    }

    const response = await fetch(`/api/rooms/${selectedRoom}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userIds: selectedUsers }),
    })

    if (response.ok) {
      toast({
        title: "Success",
        description: "Users assigned to room successfully",
      })
      setSelectedUsers([])
      fetchRooms()
    } else {
      toast({
        title: "Error",
        description: "Failed to assign users to room",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Create Room</h2>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Room Name"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <Button onClick={handleCreateRoom}>Create Room</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Assign Users to Room</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="room-select">Select Room</Label>
            <Select onValueChange={setSelectedRoom} value={selectedRoom}>
              <SelectTrigger id="room-select">
                <SelectValue placeholder="Select a room" />
              </SelectTrigger>
              <SelectContent>
                {rooms.map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    {room.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="user-select">Select Users</Label>
            <Select
              onValueChange={(value) => setSelectedUsers((prev) => [...prev, value])}
              value={selectedUsers[selectedUsers.length - 1] || ""}
            >
              <SelectTrigger id="user-select">
                <SelectValue placeholder="Select users" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name || user.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedUsers.map((userId) => {
              const user = users.find((u) => u.id === userId)
              return (
                <div
                  key={userId}
                  className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center"
                >
                  <span>{user?.name || user?.email}</span>
                  <button
                    onClick={() => setSelectedUsers((prev) => prev.filter((id) => id !== userId))}
                    className="ml-2 text-secondary-foreground hover:text-primary"
                  >
                    &times;
                  </button>
                </div>
              )
            })}
          </div>
          <Button onClick={handleAssignUsers}>Assign Users</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Room List</h2>
        <ul className="space-y-4">
          {rooms.map((room) => (
            <li key={room.id} className="border p-4 rounded-md">
              <h3 className="text-xl font-semibold">{room.name}</h3>
              <p className="text-muted-foreground">Users in room:</p>
              <ul className="list-disc list-inside">
                {room.users.map((userRoom) => (
                  <li key={userRoom.id}>{userRoom.user.name || userRoom.user.email}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


