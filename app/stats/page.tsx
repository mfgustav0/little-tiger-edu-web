"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Target, Zap, Award } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { gameStore } from "@/lib/game-store";
import { Header } from "@/components/header";

export default function StatsPage() {
  const [stats, setStats] = useState({
    coins: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    totalGames: 0,
    accuracy: 0,
    level: "Iniciante",
    streak: 0,
    bestStreak: 0,
  });

  useEffect(() => {
    const data = gameStore.getData();
    const total = data.correctAnswers + data.wrongAnswers;
    const accuracy =
      total > 0 ? Math.round((data.correctAnswers / total) * 100) : 0;

    let level = "Iniciante";
    if (accuracy >= 80) level = "Mestre";
    else if (accuracy >= 60) level = "Aprendiz";

    setStats({
      coins: data.coins,
      correctAnswers: data.correctAnswers,
      wrongAnswers: data.wrongAnswers,
      totalGames: total,
      accuracy,
      level,
      streak: 2,
      bestStreak: 5,
    });
  }, []);

  const getLevelColor = () => {
    if (stats.accuracy >= 80) return "text-amber-400";
    if (stats.accuracy >= 60) return "text-blue-400";
    return "text-slate-400";
  };

  const getLevelBg = () => {
    if (stats.accuracy >= 80)
      return "from-amber-500/20 to-orange-500/20 border-amber-500/50";
    if (stats.accuracy >= 60)
      return "from-blue-500/20 to-cyan-500/20 border-blue-500/50";
    return "from-slate-500/20 to-slate-600/20 border-slate-500/50";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-4 pb-28">
      <div className="max-w-md mx-auto mb-6">
        <Header
          title="Estatísticas"
          description="Seu progresso detalhado"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto space-y-4">
        {/* Level Card */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-6">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-linear-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-5xl">🐯</span>
            </div>
            <div>
              <div
                className={`inline-block px-6 py-3 bg-linear-to-r ${getLevelBg()} border rounded-full mb-2`}
              >
                <span className={`text-lg font-bold ${getLevelColor()}`}>
                  Nível: {stats.level}
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Continue jogando para evoluir!
              </p>
            </div>
          </div>
        </Card>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-5">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-xs text-slate-400">Acertos</span>
            </div>
            <p className="text-3xl font-bold text-green-400">
              {stats.correctAnswers}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              de {stats.totalGames} perguntas
            </p>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-xs text-slate-400">Precisão</span>
            </div>
            <p className="text-3xl font-bold text-blue-400">
              {stats.accuracy}%
            </p>
            <p className="text-xs text-slate-500 mt-1">taxa de acerto</p>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-5">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span className="text-xs text-slate-400">Sequência</span>
            </div>
            <p className="text-3xl font-bold text-amber-400">{stats.streak}</p>
            <p className="text-xs text-slate-500 mt-1">acertos seguidos</p>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-5">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span className="text-xs text-slate-400">Recorde</span>
            </div>
            <p className="text-3xl font-bold text-purple-400">
              {stats.bestStreak}
            </p>
            <p className="text-xs text-slate-500 mt-1">melhor sequência</p>
          </Card>
        </div>

        {/* Detailed Stats */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-5">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Desempenho Geral
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Acertos</span>
                <span className="font-semibold text-green-400">
                  {stats.correctAnswers}
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-linear-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                  style={{
                    width:
                      stats.totalGames > 0
                        ? `${(stats.correctAnswers / stats.totalGames) * 100}%`
                        : "0%",
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Erros</span>
                <span className="font-semibold text-red-400">
                  {stats.wrongAnswers}
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-linear-to-r from-red-500 to-rose-500 h-2 rounded-full transition-all"
                  style={{
                    width:
                      stats.totalGames > 0
                        ? `${(stats.wrongAnswers / stats.totalGames) * 100}%`
                        : "0%",
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Precisão</span>
                <span className="font-semibold text-blue-400">
                  {stats.accuracy}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-linear-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                  style={{ width: `${stats.accuracy}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
