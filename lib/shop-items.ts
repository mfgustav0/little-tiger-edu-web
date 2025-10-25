import {
  Sparkles,
  SkipForward,
  Palette,
  Coins,
  Bug,
  Bird,
  Dog,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ShopItemCategory = "power-up" | "cosmetic";

export type ShopItemIcon = LucideIcon | string;

export type ShopItem = {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: ShopItemIcon;
  category: ShopItemCategory;
};

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
    id: "icon-default",
    name: "Tiger",
    description: "O mascote mais brabo",
    cost: 0,
    icon: "🐯",
    category: "cosmetic",
  },
  {
    id: "icon-dog",
    name: "Dog",
    description: "Desbloqueie o melhor amigo do homem",
    cost: 20,
    icon: Dog,
    category: "cosmetic",
  },
  {
    id: "icon-bird",
    name: "Voa Voa",
    description: "Desbloqueie a Ave",
    cost: 20,
    icon: Bird,
    category: "cosmetic",
  },
  {
    id: "icon-bug",
    name: "Bug",
    description: "Desbloqueie o problema de todos os dev's",
    cost: 50,
    icon: Bug,
    category: "cosmetic",
  },
];

export const CATEGORY_INFO = {
  "power-up": {
    title: "Power-ups",
    icon: Sparkles,
    iconColor: "text-amber-400",
  },
  cosmetic: {
    title: "Mascotes",
    icon: Palette,
    iconColor: "text-blue-400",
  },
} as const;

export function getMascotById(mascotId: string): ShopItem {
  const mascot = SHOP_ITEMS.find(
    (item) => item.category === "cosmetic" && item.id === mascotId
  );
  if (!mascot) {
    return SHOP_ITEMS.find((item) => item.id === "icon-default")!;
  }

  return mascot;
}
