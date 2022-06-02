export interface InputSaveAnswerDto {
    roundId: number
    questionId: number
    optionId: number
}

export interface OutputSaveAnswerDto {
  answer?: OutputSaveAnswerAnswerDto
}

export interface OutputSaveAnswerRoundDto {
  id: number
  player_id: number
  questions: OutpuSaveAnswerQuestionDto[],
  answers: OutputSaveAnswerAnswerDto[]
}

export interface OutpuSaveAnswerQuestionDto {
  id: number
  description: string
  options: OutputSaveAnswerOptionsDto[]  
}

export interface OutputSaveAnswerOptionsDto {
  id: number
  label: string
}

export interface OutputSaveAnswerAnswerDto {
  id: number
  question_id: number
  option_id: number
  correct: boolean
}