import type React from "react";
import type { ShopItemCategory } from "@/lib/shop-items";
import { CATEGORY_INFO } from "@/lib/shop-items";

type ShopSectionProps = {
  category: ShopItemCategory;
  children: React.ReactNode;
};

export function ShopSection({ category, children }: ShopSectionProps) {
  const info = CATEGORY_INFO[category];
  const Icon = info.icon;

  return (
    <div>
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
        <Icon className={`w-5 h-5 ${info.iconColor}`} />
        {info.title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
