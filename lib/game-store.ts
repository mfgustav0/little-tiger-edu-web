type PowerUp = {
  id: string
  quantity: number
}

type GameData = {
  coins: number
  correctAnswers: number
  wrongAnswers: number
  powerUps: PowerUp[]
  purchasedThemes: string[]
  activeTheme: string
}

const DEFAULT_DATA: GameData = {
  coins: 14,
  correctAnswers: 3,
  wrongAnswers: 1,
  powerUps: [],
  purchasedThemes: [],
  activeTheme: "default",
}

export const gameStore = {
  getData(): GameData {
    if (typeof window === "undefined") return DEFAULT_DATA
    const stored = localStorage.getItem("tigrinho-game-data")
    return stored ? JSON.parse(stored) : DEFAULT_DATA
  },

  setData(data: Partial<GameData>) {
    if (typeof window === "undefined") return
    const current = this.getData()
    const updated = { ...current, ...data }
    localStorage.setItem("tigrinho-game-data", JSON.stringify(updated))
  },

  addCoins(amount: number) {
    const data = this.getData()
    this.setData({ coins: data.coins + amount })
  },

  removeCoins(amount: number) {
    const data = this.getData()
    this.setData({ coins: Math.max(0, data.coins - amount) })
  },

  addPowerUp(id: string) {
    const data = this.getData()
    const existing = data.powerUps.find((p) => p.id === id)

    const quantityToAdd = id === "double-coins" ? 3 : 1

    if (existing) {
      existing.quantity += quantityToAdd
    } else {
      data.powerUps.push({ id, quantity: quantityToAdd })
    }
    this.setData({ powerUps: data.powerUps })
  },

  consumePowerUp(id: string): boolean {
    const data = this.getData()
    const powerUp = data.powerUps.find((p) => p.id === id)
    if (powerUp && powerUp.quantity > 0) {
      powerUp.quantity--
      if (powerUp.quantity === 0) {
        data.powerUps = data.powerUps.filter((p) => p.id !== id)
      }
      this.setData({ powerUps: data.powerUps })
      return true
    }
    return false
  },

  getPowerUpQuantity(id: string): number {
    const data = this.getData()
    const powerUp = data.powerUps.find((p) => p.id === id)
    return powerUp?.quantity || 0
  },

  purchaseTheme(themeId: string) {
    const data = this.getData()
    if (!data.purchasedThemes.includes(themeId)) {
      data.purchasedThemes.push(themeId)
      this.setData({ purchasedThemes: data.purchasedThemes })
    }
  },

  hasTheme(themeId: string): boolean {
    const data = this.getData()
    return data.purchasedThemes.includes(themeId)
  },

  incrementCorrect() {
    const data = this.getData()
    this.setData({ correctAnswers: data.correctAnswers + 1 })
  },

  incrementWrong() {
    const data = this.getData()
    this.setData({ wrongAnswers: data.wrongAnswers + 1 })
  },

  reset() {
    this.setData(DEFAULT_DATA)
  },
}
