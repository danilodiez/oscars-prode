"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { OscarPredictions } from "./OscarPredictions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

export function UserDashboard({ categories }) {
  const { data: session } = useSession()
  const [userRoom, setUserRoom] = useState(null)
  const [roomUsers, setRoomUsers] = useState([])
  const [roomPredictions, setRoomPredictions] = useState({})

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserRoom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const fetchUserRoom = async () => {
    const response = await fetch(`/api/users/${session.user.id}/room`)
    if (response.ok) {
      const data = await response.json()
      setUserRoom(data.room)
      if (data.room) {
        fetchRoomUsers(data.room.id)
        fetchRoomPredictions(data.room.id)
      }
    }
  }

  const fetchRoomUsers = async (roomId) => {
    const response = await fetch(`/api/rooms/${roomId}/users`)
    if (response.ok) {
      const data = await response.json()
      setRoomUsers(data.userRooms.map((ur) => ur.user))
    }
  }

  const fetchRoomPredictions = async (roomId) => {
    const response = await fetch(`/api/rooms/${roomId}/predictions`)
    if (response.ok) {
      const data = await response.json()
      setRoomPredictions(data.predictions)
    }
  }

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Oscar Predictions 2024</h1>
        <p className="mb-4">Please sign in to view and make your predictions.</p>
        <div className="space-x-4">
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Oscar Predictions 2024</h1>
      <div className="mb-4 text-right">
        <p>Welcome, {session.user.name || session.user.email}</p>
        <Button variant="outline" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
      {userRoom ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Room: {userRoom.name}</CardTitle>
            <CardDescription>View predictions and compete with other users in your room</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="users" className="w-full">
              <TabsList>
                <TabsTrigger value="users">Room Users</TabsTrigger>
                <TabsTrigger value="predictions">Room Predictions</TabsTrigger>
              </TabsList>
              <TabsContent value="users">
                <h3 className="text-xl font-semibold mb-2">Users in your room:</h3>
                <ul className="list-disc list-inside">
                  {roomUsers.map((user) => (
                    <li key={user.id}>{user.name || user.email}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="predictions">
                <h3 className="text-xl font-semibold mb-2">Predictions:</h3>
                <ScrollArea className="h-[400px]">
                  {Object.entries(roomPredictions).map(([userId, userData]) => (
                    <Card key={userId} className="mb-4">
                      <CardHeader>
                        <CardTitle>{userData.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {Object.entries(userData.predictions).map(([categoryId, prediction]) => (
                            <li key={categoryId}>
                              <span className="font-semibold">{prediction.categoryName}:</span> {prediction.nomineeName}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>No Room Assigned</CardTitle>
            <CardDescription>You are not assigned to a room yet. Contact an admin to join a room.</CardDescription>
          </CardHeader>
        </Card>
      )}
      <OscarPredictions categories={categories} />
    </div>
  )
}


