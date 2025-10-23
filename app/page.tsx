"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, BookOpen, Brain, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-4 flex items-center justify-center pb-28">
      <div className="max-w-md mx-auto space-y-6">
        {/* Logo & Title */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl">
            <span className="text-6xl">🐯</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-balance mb-2">Tigrinho Edu</h1>
            <p className="text-lg text-blue-200">Gire & Aprenda</p>
          </div>
        </div>

        {/* Description Card */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-6 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Aprenda Jogando</h3>
                <p className="text-sm text-slate-300">
                  Gire a roleta e responda perguntas de Matemática e História. Cada acerto rende moedas!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Desafie Seu Conhecimento</h3>
                <p className="text-sm text-slate-300">
                  Perguntas aleatórias testam seu raciocínio. Errou? Aprenda com explicações detalhadas!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Acompanhe Seu Progresso</h3>
                <p className="text-sm text-slate-300">
                  Veja suas estatísticas, precisão e evolua de Iniciante até Mestre!
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA Button */}
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
          <Link href="/game">
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-7 text-lg shadow-2xl group">
              Começar a Jogar
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Footer Note */}
        <div className="text-center animate-in fade-in duration-700 delay-500">
          <p className="text-xs text-slate-500">
            <span className="font-semibold">Educacional.</span> Sem apostas. Use em contexto orientado por educador.
          </p>
        </div>
      </div>
    </div>
  )
}
