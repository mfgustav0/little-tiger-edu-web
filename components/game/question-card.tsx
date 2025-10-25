"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Question } from "@/lib/questions";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  showExplanation: boolean;
  isCorrect: boolean;
  shakeCard: boolean;
  skipQuantity: number;
  doubleCoinsActive: boolean;
  onSelectAnswer: (index: number) => void;
  onConfirm: () => void;
  onSkip: () => void;
  onContinue: () => void;
}

export function QuestionCard({
  question,
  selectedAnswer,
  showExplanation,
  isCorrect,
  shakeCard,
  skipQuantity,
  doubleCoinsActive,
  onSelectAnswer,
  onConfirm,
  onSkip,
  onContinue,
}: QuestionCardProps) {
  return (
    <Card
      className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
        shakeCard ? "animate-shake" : ""
      }`}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-400 rounded-full text-xs font-semibold text-blue-300">
            {question.category}
          </div>
        </div>
        <h3 className="text-lg font-bold text-balance mb-4 text-white">
          {question.q}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-2 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectAnswer = index === question.answer;
          const showResult = showExplanation;

          let buttonClass =
            "w-full p-4 text-left rounded-xl border-2 transition-all font-medium";

          if (showResult) {
            if (isCorrectAnswer) {
              buttonClass += " bg-green-500/20 border-green-400 text-green-300";
            } else if (isSelected && !isCorrectAnswer) {
              buttonClass += " bg-red-500/20 border-red-400 text-red-300";
            } else {
              buttonClass += " bg-slate-700/50 border-slate-600 text-slate-400";
            }
          } else if (isSelected) {
            buttonClass += " bg-amber-500/20 border-amber-400 text-amber-300";
          } else {
            buttonClass +=
              " bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700 hover:border-slate-500";
          }

          return (
            <button
              key={index}
              onClick={() => !showExplanation && onSelectAnswer(index)}
              disabled={showExplanation}
              className={buttonClass}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div
          className={`p-4 rounded-xl mb-4 animate-in fade-in slide-in-from-top-2 ${
            isCorrect
              ? "bg-green-500/10 border border-green-400/50"
              : "bg-red-500/10 border border-red-400/50"
          }`}
        >
          <p
            className={`font-semibold mb-2 text-lg ${
              isCorrect ? "text-green-300" : "text-red-300"
            }`}
          >
            {isCorrect ? "🎉 Correto! Parabéns!" : "😔 Incorreto"}
            {isCorrect && doubleCoinsActive && " (+6 moedas - 2x ativo!)"}
          </p>
          <p className="text-sm text-slate-300">{question.explain}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {!showExplanation ? (
          <>
            <Button
              onClick={onConfirm}
              disabled={selectedAnswer === null}
              className="flex-1 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-6 disabled:opacity-50"
            >
              Confirmar resposta
            </Button>

            {skipQuantity > 0 ? (
              <Button
                onClick={onSkip}
                variant="outline"
                className="border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20 py-6 bg-transparent"
              >
                Pular
              </Button>
            ) : (
              <Button
                onClick={onSkip}
                variant="outline"
                className="border-2 border-slate-600 text-slate-300 hover:bg-slate-700 py-6 bg-transparent"
                disabled
              >
                Pular
              </Button>
            )}
          </>
        ) : (
          <Button
            onClick={onContinue}
            className="w-full bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-6"
          >
            Continuar
          </Button>
        )}
      </div>
    </Card>
  );
}
