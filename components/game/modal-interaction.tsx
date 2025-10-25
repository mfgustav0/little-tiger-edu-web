"use client";

import { useEffect, useState } from "react";

interface Props {
  show: boolean;
  isSuccess: boolean;
}

export function ModalInteraction({ show, isSuccess }: Props) {
  const [confettiVisible, setConfettiVisible] = useState<boolean>(false);

  useEffect(() => {
    if (show && isSuccess) {
      setConfettiVisible(true);
      const timer = setTimeout(() => setConfettiVisible(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setConfettiVisible(false);
    }
  }, [show, isSuccess]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none px-4"
      role="dialog"
      aria-modal="true"
      aria-live="polite"
    >
      <div className="relative max-w-md w-full pointer-events-auto">
        {isSuccess ? (
          <div className="bg-linear-to-br from-yellow-400 via-orange-400 to-orange-500 p-8 rounded-3xl shadow-2xl animate-bounce-in border-4 border-yellow-300">
            <div className="text-center space-y-4">
              <div className="text-6xl animate-bounce">🐯</div>

              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                PARABÉNS!
              </h2>

              <p className="text-lg font-bold text-slate-800 leading-relaxed">
                Você acertou e ganhou{" "}
                <span className="text-2xl text-yellow-900">+3 moedas</span>!
              </p>

              <p className="text-sm font-semibold text-slate-700 opacity-90">
                Continue assim e vire um mestre! 🎓✨
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-linear-to-br from-red-500 via-red-600 to-red-700 p-8 rounded-3xl shadow-2xl animate-shake border-4 border-red-400">
            <div className="text-center space-y-4">
              <div className="text-6xl">😿</div>

              <h2 className="text-3xl font-black text-white tracking-tight">
                QUASE LÁ!
              </h2>

              <p className="text-lg font-bold text-red-50 leading-relaxed">
                Resposta incorreta desta vez...
              </p>

              <p className="text-sm font-semibold text-red-100 opacity-90">
                Leia a explicação e tente novamente! 💪
              </p>
            </div>
          </div>
        )}
      </div>

      {confettiVisible && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 20 - 10}%`,
                backgroundColor: [
                  "#fbbf24",
                  "#f59e0b",
                  "#ff66a3",
                  "#66ffcc",
                  "#ffd86b",
                ][Math.floor(Math.random() * 5)],
                width: `${8 + Math.random() * 10}px`,
                height: `${10 + Math.random() * 14}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDelay: `${Math.random() * 300}ms`,
              }}
              className="absolute block animate-confetti rounded-sm"
            />
          ))}
        </div>
      )}
    </div>
  );
}
