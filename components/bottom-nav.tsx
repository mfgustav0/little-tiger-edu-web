"use client"

import { Home, Gamepad2, ShoppingBag, BarChart3 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Início" },
    { href: "/game", icon: Gamepad2, label: "Jogar" },
    { href: "/shop", icon: ShoppingBag, label: "Loja" },
    { href: "/stats", icon: BarChart3, label: "Stats" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700 z-50 safe-area-inset-bottom">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-around gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <button
                  className={`w-full flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                    isActive
                      ? "bg-amber-500/20 text-amber-400"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
