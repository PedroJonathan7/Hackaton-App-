"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { useAuth } from "@/lib/auth-context"
import { auth, db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, LogOut, ArrowLeft, Dumbbell, MessageCircle, Trophy } from "lucide-react"
import Link from "next/link"
import { doc, getDoc } from "firebase/firestore"

export default function PerfilPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [progress, setProgress] = useState<{ completed: number; total: number; percentage: number } | null>(null)
  const [loadingProgress, setLoadingProgress] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const loadProgress = async () => {
      if (!user) return

      try {
        const today = new Date().toISOString().split("T")[0]
        const progressRef = doc(db, "progress", `${user.uid}_${today}`)
        const progressDoc = await getDoc(progressRef)

        if (progressDoc.exists()) {
          const data = progressDoc.data()
          setProgress({
            completed: data.completed?.length || 0,
            total: data.totalExercises || 5,
            percentage: data.percentage || 0,
          })
        } else {
          setProgress({
            completed: 0,
            total: 5,
            percentage: 0,
          })
        }
      } catch (error) {
        console.error("Erro ao carregar progresso:", error)
        setProgress({
          completed: 0,
          total: 5,
          percentage: 0,
        })
      } finally {
        setLoadingProgress(false)
      }
    }

    loadProgress()
  }, [user])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/10 rounded-lg">
              <Dumbbell className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">Perfil</h1>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex justify-center">
        <Card className="w-full max-w-md border-border shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-6 bg-primary rounded-full">
                <User className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-foreground">{user.displayName || "Usuário"}</CardTitle>
              <CardDescription className="text-muted-foreground mt-2">Informações da sua conta</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="text-lg font-semibold text-foreground">{user.displayName || "Não informado"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-lg font-semibold text-foreground break-all">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border-2 border-primary/20">
                <div className="p-2 bg-primary/20 rounded-full text-primary">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Meu Progresso</p>
                  {loadingProgress ? (
                    <p className="text-lg font-semibold text-foreground">Carregando...</p>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold text-primary">{progress?.percentage || 0}%</p>
                        <p className="text-sm text-muted-foreground">
                          ({progress?.completed || 0}/{progress?.total || 5})
                        </p>
                      </div>
                      <div className="w-full bg-background rounded-full h-2 mt-2 overflow-hidden">
                        <div
                          className="bg-primary h-full transition-all duration-500 ease-out"
                          style={{ width: `${progress?.percentage || 0}%` }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Button onClick={() => signOut(auth)} variant="destructive" className="w-full font-semibold">
              <LogOut className="h-4 w-4 mr-2" />
              Sair da conta
            </Button>

            <div className="space-y-2">
              <Link href="/faq">
                <Button
                  variant="outline"
                  className="w-full border-border text-foreground hover:bg-muted justify-start bg-transparent"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Perguntas Frequentes
                </Button>
              </Link>
              <Link href="/home">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  Voltar para exercícios
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
