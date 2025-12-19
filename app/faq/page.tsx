"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Dumbbell, MessageCircle } from "lucide-react"
import Link from "next/link"

const faqs = [
  {
    question: "Qual a forma correta de fazer flexões?",
    answer:
      "Mantenha o corpo reto formando uma linha da cabeça aos pés. Desça até o peito quase tocar o chão, mantendo os cotovelos próximos ao corpo em um ângulo de 45 graus. Suba empurrando com força até estender completamente os braços. Evite arquear as costas ou levantar o quadril.",
  },
  {
    question: "Quantas vezes por semana devo treinar?",
    answer:
      "Para iniciantes, recomenda-se 3-4 vezes por semana, alternando dias de treino com dias de descanso. Atletas intermediários podem treinar 4-5 vezes por semana. O descanso é essencial para recuperação muscular e prevenção de lesões.",
  },
  {
    question: "Como evitar lesões durante os exercícios?",
    answer:
      "Sempre faça aquecimento antes de treinar (5-10 minutos de cardio leve). Mantenha a forma correta em todos os exercícios. Aumente a intensidade gradualmente. Use equipamentos adequados e ouça seu corpo - pare se sentir dor aguda. Alongue-se após o treino.",
  },
  {
    question: "Qual a diferença entre séries e repetições?",
    answer:
      "Uma repetição é um movimento completo do exercício (ex: uma flexão completa). Uma série é um grupo de repetições consecutivas. Por exemplo, fazer 3 séries de 10 repetições significa fazer 10 flexões, descansar, fazer mais 10, descansar, e fazer as últimas 10.",
  },
  {
    question: "Quanto tempo devo descansar entre as séries?",
    answer:
      "Para exercícios de força e hipertrofia: 60-90 segundos. Para exercícios de resistência: 30-45 segundos. Para exercícios de potência máxima: 2-3 minutos. Ajuste conforme seu nível de condicionamento e objetivos específicos.",
  },
  {
    question: "Como fazer o agachamento sem machucar os joelhos?",
    answer:
      "Mantenha os pés na largura dos ombros, pontas levemente voltadas para fora. Desça empurrando o quadril para trás, como se fosse sentar em uma cadeira. Mantenha os joelhos alinhados com os pés - nunca deixe passar da linha dos dedos. Mantenha o peso nos calcanhares e o tronco ereto.",
  },
  {
    question: "Posso fazer exercícios todos os dias?",
    answer:
      "Depende do tipo de exercício. Exercícios leves como caminhada ou alongamento podem ser feitos diariamente. Treinos intensos de força precisam de 48h de descanso entre sessões do mesmo grupo muscular. É importante variar os grupos musculares trabalhados para permitir recuperação adequada.",
  },
  {
    question: "Como manter a motivação para treinar regularmente?",
    answer:
      "Estabeleça metas realistas e específicas. Varie os exercícios para não cair na rotina. Treine com amigos ou em grupo. Acompanhe seu progresso com registros ou fotos. Recompense-se ao atingir marcos. Lembre-se: consistência é mais importante que intensidade.",
  },
  {
    question: "Qual o melhor horário para treinar?",
    answer:
      "O melhor horário é aquele que você consegue manter com consistência. Manhã: aumenta energia para o dia. Tarde: força muscular está no pico. Noite: pode reduzir estresse, mas evite treinos intensos muito próximos da hora de dormir (mínimo 2-3h antes).",
  },
  {
    question: "Preciso de equipamentos para começar?",
    answer:
      "Não! Exercícios com peso corporal são excelentes para começar: flexões, agachamentos, pranchas, abdominais. Você pode treinar em casa sem equipamento algum. Conforme progredir, pode adicionar faixas elásticas, halteres ou pesos para aumentar a intensidade.",
  },
]

export default function FaqPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading || !user) {
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
          <Link href="/home">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/10 rounded-lg">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">FAQ - Exercícios</h1>
          </div>
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="border-border shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Dumbbell className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Perguntas Frequentes</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Tire suas dúvidas sobre exercícios físicos. Clique em uma pergunta para ver a resposta completa.
            </p>
          </CardContent>
        </Card>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-foreground font-semibold hover:text-primary hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 flex justify-center">
          <Link href="/home">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para exercícios
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
