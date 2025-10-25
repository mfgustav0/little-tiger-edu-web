"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dices, HelpCircle, BookOpen } from "lucide-react";

export type SlotSymbol = "dice" | "question" | "book";

interface SlotMachineProps {
  slots: SlotSymbol[];
  isSpinning: boolean;
  coins: number;
  onSpin: (cost: number) => void;
  onReset: () => void;
}

const SymbolIcon = ({
  symbol,
  isSpinning,
}: {
  symbol: SlotSymbol;
  isSpinning: boolean;
}) => {
  const iconClass = `w-12 h-12 ${isSpinning ? "animate-spin" : ""}`;

  switch (symbol) {
    case "dice":
      return <Dices className={iconClass} />;
    case "question":
      return <HelpCircle className={iconClass} />;
    case "book":
      return <BookOpen className={iconClass} />;
  }
};

export function SlotMachine({
  slots,
  isSpinning,
  coins,
  onSpin,
  onReset,
}: SlotMachineProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-6">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold mb-1 text-white">
          Máquina do Estudo
        </h2>
        <p className="text-sm text-blue-300">Gire e responda perguntas!</p>
      </div>

      {/* Slots */}
      <div className="flex justify-center gap-3 mb-6">
        {slots.map((symbol, index) => (
          <div
            key={index}
            className="w-24 h-24 bg-linear-to-br to-slate-800 rounded-2xl border-2 border-amber-500/50 flex items-center justify-center shadow-xl text-white"
          >
            <div className={isSpinning ? "animate-bounce" : ""}>
              <SymbolIcon symbol={symbol} isSpinning={isSpinning} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <Button
          onClick={() => onSpin(1)}
          disabled={isSpinning || coins < 1}
          className="flex-1 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 text-base shadow-lg disabled:opacity-50"
        >
          Girar (1 moeda)
        </Button>

        <Button
          onClick={onReset}
          variant="outline"
          className="w-full hover:text-white hover:bg-white/30 py-4"
        >
          Resetar Pontos
        </Button>
      </div>
    </Card>
  );
}
