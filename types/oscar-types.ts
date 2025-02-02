export interface Nominee {
  id: string
  name: string
}

export interface Category {
  id: string
  name: string
  nominees: Nominee[]
}

export interface Prediction {
  categoryId: string
  nomineeId: string
}

