import { gameStore } from "@/lib/game-store";
import { getMascotById, SHOP_ITEMS, ShopItemIcon } from "@/lib/shop-items";
import { useEffect, useState } from "react";

interface Props {
  title: string;
  description: string;
}

export function Header({ title, description }: Props) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [mascotIcon, setMascotIcon] = useState<ShopItemIcon>("");

  useEffect(() => {
    setMounted(true);

    const activeMascot = gameStore.getActiveMascot();
    const mascot = getMascotById(activeMascot);

    setMascotIcon(mascot.icon);
  }, []);

  const Icon = () => {
    if (typeof mascotIcon === "string") {
      return <span className="text-2xl">{mascotIcon}</span>;
    }

    const LucideIcon = mascotIcon;

    return <LucideIcon className="w-6 h-6 text-black" />;
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
          <Icon />
        </div>

        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-xs text-blue-200">{description}</p>
        </div>
      </div>
    </div>
  );
}
