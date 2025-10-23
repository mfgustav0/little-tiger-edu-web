"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { gameStore } from "@/lib/game-store"
import { Sparkles, SkipForward, Palette, Coins } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { CoinsDisplay } from "@/components/coins-display"
import { Header } from "@/components/header"

type ShopItem = {
  id: string
  name: string
  description: string
  cost: number
  icon: React.ReactNode
  category: "power-up" | "cosmetic"
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: "skip",
    name: "Pular Pergunta",
    description: "Pule uma pergunta difícil sem perder moedas",
    cost: 3,
    icon: <SkipForward className="w-6 h-6" />,
    category: "power-up",
  },
  {
    id: "double-coins",
    name: "Moedas em Dobro",
    description: "Ganhe o dobro de moedas nas próximas 3 perguntas",
    cost: 8,
    icon: <Coins className="w-6 h-6" />,
    category: "power-up",
  },
  {
    id: "theme-gold",
    name: "Tema Dourado",
    description: "Desbloqueie o tema visual dourado premium",
    cost: 20,
    icon: <Palette className="w-6 h-6" />,
    category: "cosmetic",
  },
  {
    id: "theme-emerald",
    name: "Tema Esmeralda",
    description: "Desbloqueie o tema visual esmeralda premium",
    cost: 20,
    icon: <Palette className="w-6 h-6" />,
    category: "cosmetic",
  },
]

export default function ShopPage() {
  const [coins, setCoins] = useState(0)
  const [powerUps, setPowerUps] = useState<{ [key: string]: number }>({})
  const [purchasedThemes, setPurchasedThemes] = useState<string[]>([])

  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = () => {
    const data = gameStore.getData()
    setCoins(data.coins)

    const powerUpMap: { [key: string]: number } = {}
    data.powerUps.forEach((p) => {
      powerUpMap[p.id] = p.quantity
    })
    setPowerUps(powerUpMap)
    setPurchasedThemes(data.purchasedThemes)
  }

  const handlePurchase = (item: ShopItem) => {
    if (coins >= item.cost) {
      if (item.category === "power-up") {
        gameStore.removeCoins(item.cost)
        gameStore.addPowerUp(item.id)
      } else if (item.category === "cosmetic") {
        if (!gameStore.hasTheme(item.id)) {
          gameStore.removeCoins(item.cost)
          gameStore.purchaseTheme(item.id)
        }
      }
      refreshData()
    }
  }

  const isPurchased = (item: ShopItem) => {
    if (item.category === "cosmetic") {
      return purchasedThemes.includes(item.id)
    }
    return false
  }

  const canAfford = (cost: number) => coins >= cost

  const getPowerUpQuantity = (itemId: string) => powerUps[itemId] || 0

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-4 pb-28">
      {/* Header */}
      <div className="max-w-md mx-auto mb-6">
        <Header 
          title='Loja do Tigrinho'
          description='Use suas moedas aqui'
          iconClass="bg-linear-to-br from-amber-400 to-orange-500"
        />
        
        <CoinsDisplay coins={coins} />
      </div>

      {/* Shop Items */}
      <div className="max-w-md mx-auto space-y-4">
        {/* Power-ups Section */}
        <div>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Power-ups
          </h2>
          <div className="space-y-3">
            {SHOP_ITEMS.filter((item) => item.category === "power-up").map((item) => {
              const quantity = getPowerUpQuantity(item.id)

              return (
                <Card key={item.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center shrink-0 border border-amber-500/30">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold">{item.name}</h3>
                        {quantity > 0 && (
                          <span className="px-2 py-1 bg-blue-500/20 border border-blue-400/50 rounded-full text-xs font-bold text-blue-300">
                            {quantity}x
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{item.description}</p>
                      <Button
                        onClick={() => handlePurchase(item)}
                        disabled={!canAfford(item.cost)}
                        className={`w-full ${
                          canAfford(item.cost)
                            ? "bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                            : "bg-slate-700 text-slate-500"
                        }`}
                      >
                        <Coins className="w-4 h-4 mr-2" />
                        {item.cost} moedas
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Cosmetics Section */}
        <div>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Palette className="w-5 h-5 text-blue-400" />
            Temas Visuais
          </h2>
          <div className="space-y-3">
            {SHOP_ITEMS.filter((item) => item.category === "cosmetic").map((item) => (
              <Card key={item.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/30">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold mb-1">{item.name}</h3>
                    <p className="text-sm text-slate-400 mb-3">{item.description}</p>
                    <Button
                      onClick={() => handlePurchase(item)}
                      disabled={isPurchased(item) || !canAfford(item.cost)}
                      className={`w-full ${
                        isPurchased(item)
                          ? "bg-green-500/20 text-green-400 border border-green-500/50"
                          : canAfford(item.cost)
                            ? "bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                            : "bg-slate-700 text-slate-500"
                      }`}
                    >
                      {isPurchased(item) ? (
                        "✓ Desbloqueado"
                      ) : (
                        <>
                          <Coins className="w-4 h-4 mr-2" />
                          {item.cost} moedas
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <Card className="bg-blue-500/10 border-blue-500/30 backdrop-blur-sm p-4">
          <p className="text-sm text-blue-200 leading-relaxed">
            💡 <span className="font-semibold">Dica:</span> Ganhe mais moedas respondendo perguntas corretamente no
            jogo. Cada acerto vale +3 moedas!
          </p>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
