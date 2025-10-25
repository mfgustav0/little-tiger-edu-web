"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { gameStore } from "@/lib/game-store";
import { BottomNav } from "@/components/bottom-nav";
import { CoinsDisplay } from "@/components/coins-display";
import { Header } from "@/components/header";
import { SHOP_ITEMS } from "@/lib/shop-items";
import type { ShopItem } from "@/lib/shop-items";
import { ShopSection } from "@/components/shop/section";
import { ShopItemCard } from "@/components/shop/item-card";

export default function ShopPage() {
  const [coins, setCoins] = useState(0);
  const [powerUps, setPowerUps] = useState<{ [key: string]: number }>({});
  const [purchasedThemes, setPurchasedThemes] = useState<string[]>([]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const data = gameStore.getData();
    setCoins(data.coins);

    const powerUpMap: { [key: string]: number } = {};
    data.powerUps.forEach((p) => {
      powerUpMap[p.id] = p.quantity;
    });
    setPowerUps(powerUpMap);
    setPurchasedThemes(data.purchasedThemes);
  };

  const handlePurchase = (item: ShopItem) => {
    if (coins < item.cost) return;

    if (item.category === "power-up") {
      gameStore.removeCoins(item.cost);
      gameStore.addPowerUp(item.id);
    } else if (item.category === "cosmetic") {
      if (!gameStore.hasTheme(item.id)) {
        gameStore.removeCoins(item.cost);
        gameStore.purchaseTheme(item.id);
      }
    }

    refreshData();
  };

  const isPurchased = (item: ShopItem) => {
    return item.category === "cosmetic" && purchasedThemes.includes(item.id);
  };

  const canAfford = (cost: number) => coins >= cost;

  const getPowerUpQuantity = (itemId: string) => powerUps[itemId] || 0;

  const powerUpItems = SHOP_ITEMS.filter(
    (item) => item.category === "power-up"
  );
  const cosmeticItems = SHOP_ITEMS.filter(
    (item) => item.category === "cosmetic"
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-4 pb-28">
      {/* Header */}
      <div className="max-w-md mx-auto mb-6">
        <Header title="Loja do Tigrinho" description="Use suas moedas aqui" />

        <CoinsDisplay coins={coins} />
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <ShopSection category="power-up">
          {powerUpItems.map((item) => (
            <ShopItemCard
              key={item.id}
              item={item}
              quantity={getPowerUpQuantity(item.id)}
              canAfford={canAfford(item.cost)}
              onPurchase={() => handlePurchase(item)}
            />
          ))}
        </ShopSection>

        <ShopSection category="cosmetic">
          {cosmeticItems.map((item) => (
            <ShopItemCard
              key={item.id}
              item={item}
              isPurchased={isPurchased(item)}
              canAfford={canAfford(item.cost)}
              onPurchase={() => handlePurchase(item)}
            />
          ))}
        </ShopSection>

        <Card className="bg-blue-500/10 border-blue-500/30 backdrop-blur-sm p-4">
          <p className="text-sm text-blue-200 leading-relaxed text-pretty">
            💡 <span className="font-semibold">Dica:</span> Ganhe mais moedas
            respondendo perguntas corretamente no jogo. Cada acerto vale +3
            moedas!
          </p>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
