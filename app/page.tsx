"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { FirebaseConfigCheck } from "@/components/firebase-config-check"

export default function Page() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/home")
      } else {
        router.push("/login")
      }
    }
  }, [user, loading, router])

  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    return <FirebaseConfigCheck />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
}
