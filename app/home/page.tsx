"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Dumbbell, Activity, Timer, Target, Footprints, MessageCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { ExerciseModal } from "@/components/exercise-modal"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Exercise {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  duration: string
  reps: string
}

const exercises: Exercise[] = [
  {
    id: "abdominal",
    name: "Abdominal",
    icon: <Target className="h-8 w-8" />,
    description:
      "Exercício para fortalecer os músculos abdominais. Deite-se de costas com os joelhos dobrados e eleve o tronco em direção às pernas.",
    duration: "3 séries",
    reps: "15-20 repetições",
  },
  {
    id: "flexao",
    name: "Flexão",
    icon: <Activity className="h-8 w-8" />,
    description:
      "Exercício que trabalha peito, ombros e tríceps. Mantenha o corpo reto e abaixe até o peito quase tocar o chão.",
    duration: "3 séries",
    reps: "10-15 repetições",
  },
  {
    id: "prancha",
    name: "Prancha",
    icon: <Timer className="h-8 w-8" />,
    description: "Excelente para fortalecer o core. Mantenha o corpo reto apoiado nos antebraços e dedos dos pés.",
    duration: "3 séries",
    reps: "30-60 segundos",
  },
  {
    id: "agachamento",
    name: "Agachamento",
    icon: <Dumbbell className="h-8 w-8" />,
    description:
      "Fortalece pernas e glúteos. Desça como se fosse sentar em uma cadeira, mantendo os joelhos alinhados com os pés.",
    duration: "3 séries",
    reps: "15-20 repetições",
  },
  {
    id: "corrida",
    name: "Corrida Estacionária",
    icon: <Footprints className="h-8 w-8" />,
    description: "Cardio intenso sem sair do lugar. Eleve os joelhos alternadamente em um ritmo acelerado.",
    duration: "3 séries",
    reps: "1-2 minutos",
  },
]

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [completedExercises, setCompletedExercises] = useState<string[]>([])
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
          setCompletedExercises(progressDoc.data().completed || [])
        } else {
          setCompletedExercises([])
        }
      } catch (error) {
        console.error("Erro ao carregar progresso:", error)
      } finally {
        setLoadingProgress(false)
      }
    }

    loadProgress()
  }, [user])

  const handleCompleteExercise = async (exerciseId: string) => {
    if (!user || completedExercises.includes(exerciseId)) return

    try {
      const today = new Date().toISOString().split("T")[0]
      const progressRef = doc(db, "progress", `${user.uid}_${today}`)
      const newCompleted = [...completedExercises, exerciseId]

      await setDoc(progressRef, {
        userId: user.uid,
        date: today,
        completed: newCompleted,
        totalExercises: exercises.length,
        percentage: Math.round((newCompleted.length / exercises.length) * 100),
        updatedAt: new Date().toISOString(),
      })

      setCompletedExercises(newCompleted)
    } catch (error) {
      console.error("Erro ao atualizar progresso:", error)
    }
  }

  if (loading || !user || loadingProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/10 rounded-lg">
              <Dumbbell className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">Fitness App</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/faq">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/perfil">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Olá, {user.displayName || "Atleta"}! 👋</h2>
          <p className="text-muted-foreground text-lg">Escolha um exercício para começar seu treino</p>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Progresso de Hoje</span>
              <span className="text-sm font-bold text-primary">
                {completedExercises.length}/{exercises.length}
              </span>
            </div>
            <div className="w-full bg-background rounded-full h-3 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-500 ease-out"
                style={{ width: `${(completedExercises.length / exercises.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Exercise Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => {
            const isCompleted = completedExercises.includes(exercise.id)

            return (
              <Card
                key={exercise.id}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-border bg-card relative ${
                  isCompleted ? "ring-2 ring-green-500" : ""
                }`}
                onClick={() => setSelectedExercise(exercise)}
              >
                {isCompleted && (
                  <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                )}
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div
                    className={`p-4 rounded-full transition-colors duration-300 ${
                      isCompleted
                        ? "bg-green-500/20 text-green-600"
                        : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                    }`}
                  >
                    {exercise.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{exercise.name}</h3>
                  <Button
                    variant="outline"
                    className={`w-full ${
                      isCompleted
                        ? "border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
                        : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    } bg-transparent`}
                  >
                    {isCompleted ? "Concluído" : "Ver detalhes"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>

      {/* Exercise Modal */}
      <ExerciseModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
        isCompleted={selectedExercise ? completedExercises.includes(selectedExercise.id) : false}
        onComplete={handleCompleteExercise}
      />
    </div>
  )
}
