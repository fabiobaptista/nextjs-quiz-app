export interface InputCreateRoundDto {
  round: {
    playerName: string
    categoryId: number
  }
}

export interface OutputCreateRoundDto {
  round?: OutputCreateRoundRoundDto
}

export interface OutputCreateRoundRoundDto {
  id: number
  player_name: string
  questions: OutpuCreateRoundQuestionDto[]
}

export interface OutpuCreateRoundQuestionDto {
  id: number
  description: string
  options: OutputCreateRoundOptionsDto[]  
}

export interface OutputCreateRoundOptionsDto {
  id: number
  label: string
}