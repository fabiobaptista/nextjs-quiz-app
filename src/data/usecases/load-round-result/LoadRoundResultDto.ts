export interface InputLoadRoundResultDto {
  roundId: number
}

export interface OutputLoadRoundResultDto {
  round?: {
    id: number
    player_id: number
    total_questions: number
    total_answered_questions: number
    total_correct_answers: number
  }
}
