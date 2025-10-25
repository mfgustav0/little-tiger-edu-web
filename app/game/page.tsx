"use client";

import { useState, useEffect } from "react";
import { Category, categoryList, Question, questions } from "@/lib/questions";
import { gameStore } from "@/lib/game-store";
import { Coins } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { CoinsDisplay } from "@/components/coins-display";
import { Header } from "@/components/header";
import { SlotMachine, SlotSymbol } from "@/components/game/slot-machine";
import { CategorySelector } from "@/components/game/category-selector";
import { GameTipCard } from "@/components/game/game-tip-card";
import { QuestionCard } from "@/components/game/question-card";
import { ModalInteraction } from "@/components/game/modal-interaction";

type GameState = "idle" | "spinning" | "question" | "result";

const SYMBOLS: SlotSymbol[] = ["dice", "question", "book"];

export default function GamePage() {
  const [slots, setSlots] = useState<SlotSymbol[]>([
    "dice",
    "question",
    "book",
  ]);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [activeCategories, setActiveCategories] = useState<Category[]>([
    ...categoryList,
  ]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [shakeCard, setShakeCard] = useState<boolean>(false);

  const [coins, setCoins] = useState(0);

  const skipQuantity = gameStore.getPowerUpQuantity("skip");
  const doubleCoinsQuantity = gameStore.getPowerUpQuantity("double-coins");

  useEffect(() => {
    const data = gameStore.getData();
    setCoins(data.coins);
  }, []);

  const refreshCoins = () => {
    const data = gameStore.getData();
    setCoins(data.coins);
  };

  const spinSlots = (duration = 2000) => {
    setGameState("spinning");

    const interval = setInterval(() => {
      setSlots([
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const finalSlots: SlotSymbol[] = [
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ];
      setSlots(finalSlots);

      const availableQuestions = questions.filter((q) =>
        activeCategories.includes(q.category)
      );
      const randomQuestion =
        availableQuestions[
          Math.floor(Math.random() * availableQuestions.length)
        ];
      setCurrentQuestion(randomQuestion);
      setGameState("question");
    }, duration);
  };

  const handleSpin = (cost: number) => {
    if (coins >= cost) {
      gameStore.removeCoins(cost);
      refreshCoins();
      spinSlots(cost === 1 ? 2000 : 3000);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleAnswer = () => {
    const correct = selectedAnswer === currentQuestion?.answer;
    setIsCorrect(correct);
    setShowExplanation(true);

    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);

    if (correct) {
      gameStore.incrementCorrect();

      const coinsToAdd = doubleCoinsQuantity > 0 ? 6 : 3;
      gameStore.addCoins(coinsToAdd);

      if (doubleCoinsQuantity > 0) {
        gameStore.consumePowerUp("double-coins");
      }
    } else {
      setShakeCard(true);
      setTimeout(() => setShakeCard(false), 500);
      gameStore.incrementWrong();
    }

    refreshCoins();
  };

  const handleSkip = () => {
    if (skipQuantity > 0) {
      gameStore.consumePowerUp("skip");
    }
    setGameState("idle");
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowExplanation(false);
    refreshCoins();
  };

  const handleContinue = () => {
    setGameState("idle");
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleReset = () => {
    gameStore.reset();
    refreshCoins();
  };

  const handleToggleCategory = (category: Category) => {
    if (activeCategories.includes(category)) {
      if (activeCategories.length > 1) {
        setActiveCategories(activeCategories.filter((c) => c !== category));
      }
    } else {
      setActiveCategories([...activeCategories, category]);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-4 pb-28">
      <ModalInteraction show={showModal} isSuccess={isCorrect} />

      {/* Header */}
      <div className="max-w-md mx-auto mb-6">
        <Header title="Tigrinho Edu" description="Game divertido" />

        <CoinsDisplay coins={coins} />

        {(skipQuantity > 0 || doubleCoinsQuantity > 0) && (
          <div className="mt-3 flex gap-2">
            {skipQuantity > 0 && (
              <div className="flex-1 bg-purple-500/10 border border-purple-500/30 rounded-lg px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-purple-300">Pular</span>
                </div>
                <span className="text-sm font-bold text-purple-400">
                  {skipQuantity}
                </span>
              </div>
            )}
            {doubleCoinsQuantity > 0 && (
              <div className="flex-1 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-amber-300">2x</span>
                </div>
                <span className="text-sm font-bold text-amber-400">
                  {doubleCoinsQuantity}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto space-y-4">
        {/* Slot Machine */}
        {gameState !== "question" && (
          <>
            <SlotMachine
              slots={slots}
              isSpinning={gameState === "spinning"}
              coins={coins}
              onSpin={handleSpin}
              onReset={handleReset}
            />

            <GameTipCard />

            <CategorySelector
              activeCategories={activeCategories}
              onToggleCategory={handleToggleCategory}
            />
          </>
        )}

        {gameState === "question" && currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            showExplanation={showExplanation}
            isCorrect={isCorrect}
            shakeCard={shakeCard}
            skipQuantity={skipQuantity}
            doubleCoinsActive={doubleCoinsQuantity > 0}
            onSelectAnswer={setSelectedAnswer}
            onConfirm={handleAnswer}
            onSkip={handleSkip}
            onContinue={handleContinue}
          />
        )}
      </div>

      <BottomNav />
    </div>
  );
}
