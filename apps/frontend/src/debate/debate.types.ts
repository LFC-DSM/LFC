export type DebateSide = 'supporting' | 'opposing'

export interface DebateTurn {
  id: string
  side: DebateSide
  stage: string
  content: string
}
