import { Question } from '../value-objects/Question'

export interface Round {
  id: number
  playerId: number
  questions: Question[]
}