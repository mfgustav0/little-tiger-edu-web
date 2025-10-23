import { Coins } from "lucide-react";

interface Props {
  coins: number
}

export function CoinsDisplay({ coins }: Props) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Coins className="w-5 h-5 text-amber-400" />
        <span className="text-sm text-slate-400">Moedas</span>
      </div>

      <span className="text-2xl font-bold text-amber-400">{coins}</span>
    </div>
  )
}