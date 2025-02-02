import { useState } from "react"
import type { Prediction, Category } from "../types/oscar-types"

export function usePredictions(categories: Category[]) {
  const [predictions, setPredictions] = useState<Prediction[]>([])

  const makePrediction = (categoryId: string, nomineeId: string) => {
    setPredictions((prev) => {
      const existing = prev.find((p) => p.categoryId === categoryId)
      if (existing) {
        return prev.map((p) => (p.categoryId === categoryId ? { ...p, nomineeId } : p))
      } else {
        return [...prev, { categoryId, nomineeId }]
      }
    })
  }

  const getPrediction = (categoryId: string) => {
    return predictions.find((p) => p.categoryId === categoryId)?.nomineeId
  }

  return { predictions, makePrediction, getPrediction }
}

