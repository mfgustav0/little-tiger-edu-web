"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Coins, Check } from "lucide-react";
import type { ShopItem } from "@/lib/shop-items";

type ShopItemCardProps = {
  item: ShopItem;
  quantity?: number;
  isPurchased?: boolean;
  isActive?: boolean;
  canAfford: boolean;
  onPurchase: () => void;
  onActivateMascot?: () => void;
};

export function ShopItemCard({
  item,
  quantity = 0,
  isPurchased = false,
  isActive = false,
  canAfford,
  onPurchase,
  onActivateMascot,
}: ShopItemCardProps) {
  const isCosmetic = item.category === "cosmetic";

  const Icon = () => {
    if (typeof item.icon === "string") {
      return <span className="text-2xl">{item.icon}</span>;
    }

    const LucideIcon = item.icon;

    return <LucideIcon className="w-6 h-6 text-white" />;
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-4">
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
            isCosmetic
              ? "bg-linear-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30"
              : "bg-linear-to-br from-amber-500/20 to-orange-500/20 border-amber-500/30"
          }`}
        >
          <Icon />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-balance text-white">{item.name}</h3>
            {isActive && isCosmetic ? (
              <span className="px-2 py-1 bg-green-500/20 border border-green-400/50 rounded-full text-xs font-bold text-green-300 flex items-center gap-1">
                <Check className="w-3 h-3" />
                Ativo
              </span>
            ) : quantity > 0 ? (
              <span className="px-2 py-1 bg-blue-500/20 border border-blue-400/50 rounded-full text-xs font-bold text-blue-300">
                {quantity}x
              </span>
            ) : null}
          </div>

          <p className="text-sm text-slate-400 mb-3 text-pretty">
            {item.description}
          </p>

          {isCosmetic && isPurchased && !isActive ? (
            <Button
              onClick={onActivateMascot}
              className="w-full bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              Ativar Mascote
            </Button>
          ) : (
            <Button
              onClick={onPurchase}
              disabled={isPurchased || !canAfford}
              className={`w-full ${
                isPurchased
                  ? "bg-green-500/20 text-green-400 border border-green-500/50 cursor-not-allowed"
                  : canAfford
                  ? "bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  : "bg-slate-700 text-slate-500 cursor-not-allowed"
              }`}
            >
              {isPurchased ? (
                "✓ Desbloqueado"
              ) : (
                <>
                  <Coins className="w-4 h-4 mr-2" />
                  {item.cost} moedas
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
