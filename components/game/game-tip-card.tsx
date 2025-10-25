import { Card } from "../ui/card";

export function GameTipCard() {
  return (
    <Card className="bg-blue-500/10 border-blue-500/30 backdrop-blur-sm p-4">
      <p className="text-sm text-blue-200 leading-relaxed">
        💡 <span className="font-semibold">Dica:</span> Ganhe mais moedas
        respondendo perguntas corretamente no jogo. Cada acerto vale +3 moedas!
      </p>
    </Card>
  );
}
