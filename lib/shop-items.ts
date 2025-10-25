import { Sparkles, SkipForward, Palette, Coins } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type ShopItemCategory = "power-up" | "cosmetic"

export type ShopItem = {
  id: string
  name: string
  description: string
  cost: number
  icon: LucideIcon
  category: ShopItemCategory
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "skip",
    name: "Pular Pergunta",
    description: "Pule uma pergunta difícil sem perder moedas",
    cost: 3,
    icon: SkipForward,
    category: "power-up",
  },
  {
    id: "double-coins",
    name: "Moedas em Dobro",
    description: "Ganhe o dobro de moedas nas próximas 3 perguntas",
    cost: 8,
    icon: Coins,
    category: "power-up",
  },
  {
    id: "theme-gold",
    name: "Tema Dourado",
    description: "Desbloqueie o tema visual dourado premium",
    cost: 20,
    icon: Palette,
    category: "cosmetic",
  },
  {
    id: "theme-emerald",
    name: "Tema Esmeralda",
    description: "Desbloqueie o tema visual esmeralda premium",
    cost: 20,
    icon: Palette,
    category: "cosmetic",
  },
]

export const CATEGORY_INFO = {
  "power-up": {
    title: "Power-ups",
    icon: Sparkles,
    iconColor: "text-amber-400",
  },
  cosmetic: {
    title: "Temas Visuais",
    icon: Palette,
    iconColor: "text-blue-400",
  },
} as const
