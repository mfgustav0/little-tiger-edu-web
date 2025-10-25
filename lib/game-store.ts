type PowerUp = {
  id: string
  quantity: number
}

type GameData = {
  coins: number
  correctAnswers: number
  wrongAnswers: number
  powerUps: PowerUp[]
  purchasedMascots: string[]
  activeMascot: string
}

const DEFAULT_DATA: GameData = {
  coins: 15,
  correctAnswers: 0,
  wrongAnswers: 0,
  powerUps: [],
  purchasedMascots: [],
  activeMascot: "icon-default",
}

export const gameStore = {
  getData(): GameData {
    if (typeof window === "undefined") return DEFAULT_DATA
    const stored = localStorage.getItem("tigrinho-game-data")
    if(!stored) return DEFAULT_DATA

    const storedJson = JSON.parse(stored);

    return {
      coins: storedJson.coins ?? 0,
      correctAnswers: storedJson.correctAnswers ?? 0,
      wrongAnswers: storedJson.wrongAnswers ?? 0,
      powerUps: storedJson.powerUps ?? [],
      purchasedMascots: storedJson.purchasedMascots ?? [],
      activeMascot: storedJson.activeMascot ?? "icon-default",
    }
  },

  setData(data: Partial<GameData>) {
    if (typeof window === "undefined") return
    const current = this.getData()
    const updated = { 
      ...current,
      ...data,
      purchaseTheme: current.purchasedMascots ?? [], 
    }
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

  purchaseMascot(mascotId: string) {
    const data = this.getData()
    if (!data.purchasedMascots.includes(mascotId)) {
      data.purchasedMascots.push(mascotId)
      this.setData({ purchasedMascots: data.purchasedMascots })
    }
  },

  hasMascot(mascotId: string): boolean {
    const data = this.getData()
    return data.purchasedMascots.includes(mascotId)
  },

  setActiveMascot(mascotId: string) {
    this.setData({ activeMascot: mascotId })
  },

  getActiveMascot(): string {
    const data = this.getData()
    return data.activeMascot
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
