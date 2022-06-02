export interface InputCreateRoundDto {
    playerName: string
    categoryId: number
}

export interface OutputCreateRoundDto {
  round?: OutputCreateRoundRoundDto
}

export interface OutputCreateRoundRoundDto {
  id: number
  player_id: number
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