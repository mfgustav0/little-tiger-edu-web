"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { questions } from "@/lib/questions"
import { gameStore } from "@/lib/game-store"
import { Dices, HelpCircle, BookOpen, Coins } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

type SlotSymbol = "dice" | "question" | "book"
type GameState = "idle" | "spinning" | "question" | "result"

const SYMBOLS: SlotSymbol[] = ["dice", "question", "book"]

const SymbolIcon = ({ symbol, isSpinning }: { symbol: SlotSymbol; isSpinning: boolean }) => {
  const iconClass = `w-12 h-12 ${isSpinning ? "animate-spin" : ""}`

  switch (symbol) {
    case "dice":
      return <Dices className={iconClass} />
    case "question":
      return <HelpCircle className={iconClass} />
    case "book":
      return <BookOpen className={iconClass} />
  }
}

export default function GamePage() {
  const [slots, setSlots] = useState<SlotSymbol[]>(["dice", "question", "book"])
  const [gameState, setGameState] = useState<GameState>("idle")
  const [currentQuestion, setCurrentQuestion] = useState<(typeof questions)[0] | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [activeCategories, setActiveCategories] = useState<string[]>(["Matemática", "História"])
  const [showConfetti, setShowConfetti] = useState(false)
  const [shakeCard, setShakeCard] = useState(false)

  const [coins, setCoins] = useState(0)

  const skipQuantity = gameStore.getPowerUpQuantity("skip")
  const doubleCoinsQuantity = gameStore.getPowerUpQuantity("double-coins")

  useEffect(() => {
    const data = gameStore.getData()
    setCoins(data.coins)
  }, [])

  const refreshCoins = () => {
    const data = gameStore.getData()
    setCoins(data.coins)
  }

  const spinSlots = (duration = 2000) => {
    setGameState("spinning")

    const interval = setInterval(() => {
      setSlots([
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ])
    }, 100)

    setTimeout(() => {
      clearInterval(interval)
      const finalSlots: SlotSymbol[] = [
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ]
      setSlots(finalSlots)

      const availableQuestions = questions.filter((q) => activeCategories.includes(q.category))
      const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
      setCurrentQuestion(randomQuestion)
      setGameState("question")
    }, duration)
  }

  const handleSpin = (cost: number) => {
    if (coins >= cost) {
      gameStore.removeCoins(cost)
      refreshCoins()
      spinSlots(cost === 1 ? 2000 : 3000)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const handleAnswer = () => {
    const correct = selectedAnswer === currentQuestion?.answer
    setIsCorrect(correct)
    setShowExplanation(true)

    if (correct) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)

      gameStore.incrementCorrect()

      const coinsToAdd = doubleCoinsQuantity > 0 ? 6 : 3
      gameStore.addCoins(coinsToAdd)

      if (doubleCoinsQuantity > 0) {
        gameStore.consumePowerUp("double-coins")
      }
    } else {
      setShakeCard(true)
      setTimeout(() => setShakeCard(false), 500)
      gameStore.incrementWrong()
    }

    refreshCoins()
  }

  const handleSkip = () => {
    if (skipQuantity > 0) {
      gameStore.consumePowerUp("skip")
    }
    setGameState("idle")
    setCurrentQuestion(null)
    setSelectedAnswer(null)
    setShowExplanation(false)
    refreshCoins()
  }

  const handleContinue = () => {
    setGameState("idle")
    setCurrentQuestion(null)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const handleReset = () => {
    gameStore.reset()
    refreshCoins()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-4 pb-28">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10%",
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random()}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ["#fbbf24", "#f59e0b", "#3b82f6", "#06b6d4", "#10b981"][
                    Math.floor(Math.random() * 5)
                  ],
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="max-w-md mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🐯</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-balance">Tigrinho Edu</h1>
              <p className="text-xs text-blue-200">Matemática & História</p>
            </div>
          </div>
        </div>

        {/* Coins Display */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            <span className="text-sm text-slate-400">Moedas</span>
          </div>
          <span className="text-2xl font-bold text-amber-400">{coins}</span>
        </div>

        {(skipQuantity > 0 || doubleCoinsQuantity > 0) && (
          <div className="mt-3 flex gap-2">
            {skipQuantity > 0 && (
              <div className="flex-1 bg-purple-500/10 border border-purple-500/30 rounded-lg px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-purple-300">Pular</span>
                </div>
                <span className="text-sm font-bold text-purple-400">{skipQuantity}</span>
              </div>
            )}
            {doubleCoinsQuantity > 0 && (
              <div className="flex-1 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-amber-300">2x</span>
                </div>
                <span className="text-sm font-bold text-amber-400">{doubleCoinsQuantity}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto space-y-4">
        {/* Slot Machine */}
        {gameState !== "question" && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-6">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold mb-1">Máquina do Tigrinho</h2>
              <p className="text-sm text-blue-300">Gire e responda perguntas!</p>
            </div>

            {/* Slots */}
            <div className="flex justify-center gap-3 mb-6">
              {slots.map((symbol, index) => (
                <div
                  key={index}
                  className="w-24 h-24 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl border-2 border-amber-500/50 flex items-center justify-center shadow-xl"
                >
                  <div className={gameState === "spinning" ? "animate-bounce" : ""}>
                    <SymbolIcon symbol={symbol} isSpinning={gameState === "spinning"} />
                  </div>
                </div>
              ))}
            </div>

            {/* Spin Buttons */}
            <div className="flex gap-3 mb-4">
              <Button
                onClick={() => handleSpin(1)}
                disabled={gameState === "spinning" || coins < 1}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-6 text-base shadow-lg disabled:opacity-50"
              >
                Girar (1 moeda)
              </Button>
              <Button
                onClick={() => handleSpin(2)}
                disabled={gameState === "spinning" || coins < 2}
                variant="outline"
                className="flex-1 border-2 border-blue-400 text-blue-300 hover:bg-blue-500/20 font-bold py-6 text-base"
              >
                Dica (2 moedas)
              </Button>
            </div>

            <Button onClick={handleReset} variant="ghost" className="w-full text-slate-400 hover:text-white">
              Resetar
            </Button>
          </Card>
        )}

        {/* Question Card */}
        {gameState === "question" && currentQuestion && (
          <Card
            className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ${shakeCard ? "animate-shake" : ""}`}
          >
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-400 rounded-full text-xs font-semibold text-blue-300">
                  {currentQuestion.category}
                </div>
              </div>
              <h3 className="text-lg font-bold text-balance mb-4">{currentQuestion.q}</h3>
            </div>

            {/* Options */}
            <div className="space-y-2 mb-6">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrectAnswer = index === currentQuestion.answer
                const showResult = showExplanation

                let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all font-medium"

                if (showResult) {
                  if (isCorrectAnswer) {
                    buttonClass += " bg-green-500/20 border-green-400 text-green-300"
                  } else if (isSelected && !isCorrectAnswer) {
                    buttonClass += " bg-red-500/20 border-red-400 text-red-300"
                  } else {
                    buttonClass += " bg-slate-700/50 border-slate-600 text-slate-400"
                  }
                } else if (isSelected) {
                  buttonClass += " bg-amber-500/20 border-amber-400 text-amber-300"
                } else {
                  buttonClass +=
                    " bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700 hover:border-slate-500"
                }

                return (
                  <button
                    key={index}
                    onClick={() => !showExplanation && setSelectedAnswer(index)}
                    disabled={showExplanation}
                    className={buttonClass}
                  >
                    {option}
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div
                className={`p-4 rounded-xl mb-4 animate-in fade-in slide-in-from-top-2 ${
                  isCorrect ? "bg-green-500/10 border border-green-400/50" : "bg-red-500/10 border border-red-400/50"
                }`}
              >
                <p className={`font-semibold mb-2 text-lg ${isCorrect ? "text-green-300" : "text-red-300"}`}>
                  {isCorrect ? "🎉 Correto! Parabéns!" : "😔 Incorreto"}
                  {isCorrect && doubleCoinsQuantity > 0 && " (+6 moedas - 2x ativo!)"}
                </p>
                <p className="text-sm text-slate-300">{currentQuestion.explain}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!showExplanation ? (
                <>
                  <Button
                    onClick={handleAnswer}
                    disabled={selectedAnswer === null}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-6 disabled:opacity-50"
                  >
                    Confirmar resposta
                  </Button>
                  {skipQuantity > 0 ? (
                    <Button
                      onClick={handleSkip}
                      variant="outline"
                      className="border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20 py-6 bg-transparent"
                    >
                      Pular
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSkip}
                      variant="outline"
                      className="border-2 border-slate-600 text-slate-300 hover:bg-slate-700 py-6 bg-transparent"
                      disabled
                    >
                      Pular
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  onClick={handleContinue}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-6"
                >
                  Continuar
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Categories Card */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-5">
          <h3 className="font-bold mb-3">Categorias Ativas</h3>
          <div className="flex flex-wrap gap-2">
            {["Matemática", "História"].map((category) => (
              <button
                key={category}
                onClick={() => {
                  if (activeCategories.includes(category)) {
                    if (activeCategories.length > 1) {
                      setActiveCategories(activeCategories.filter((c) => c !== category))
                    }
                  } else {
                    setActiveCategories([...activeCategories, category])
                  }
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeCategories.includes(category) ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
