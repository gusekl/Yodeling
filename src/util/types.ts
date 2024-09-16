export interface UserScore {
  userId: number,
  name: String,
  scores: Array<number>
  maxScore: number
}

export interface ExcelRow {
  name: string
  score: number
}