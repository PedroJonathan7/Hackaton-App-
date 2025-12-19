"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { X, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Exercise {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  duration: string
  reps: string
}

interface ExerciseModalProps {
  exercise: Exercise | null
  onClose: () => void
  isCompleted: boolean
  onComplete: (exerciseId: string) => void
}

export function ExerciseModal({ exercise, onClose, isCompleted, onComplete }: ExerciseModalProps) {
  const [isCompletingAnimation, setIsCompletingAnimation] = useState(false)

  useEffect(() => {
    if (exercise) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [exercise])

  const handleComplete = () => {
    if (exercise && !isCompleted) {
      setIsCompletingAnimation(true)
      setTimeout(() => {
        onComplete(exercise.id)
        setIsCompletingAnimation(false)
      }, 300)
    }
  }

  if (!exercise) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-primary text-primary-foreground p-6 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/10 rounded-lg">{exercise.icon}</div>
            <h2 className="text-2xl font-bold">{exercise.name}</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {isCompleted && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              <div>
                <p className="font-semibold text-green-700 dark:text-green-400">Exercício Concluído!</p>
                <p className="text-sm text-green-600 dark:text-green-500">Parabéns pelo treino de hoje</p>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Descrição</h3>
            <p className="text-muted-foreground leading-relaxed">{exercise.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Duração</p>
              <p className="text-lg font-semibold text-foreground">{exercise.duration}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Repetições</p>
              <p className="text-lg font-semibold text-foreground">{exercise.reps}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleComplete}
              disabled={isCompleted || isCompletingAnimation}
              className={`w-full font-semibold transition-all duration-300 ${
                isCompleted
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              } ${isCompletingAnimation ? "scale-95" : ""}`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Concluído
                </>
              ) : (
                "Marcar como Concluído"
              )}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-border text-foreground hover:bg-muted bg-transparent"
            >
              Fechar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
