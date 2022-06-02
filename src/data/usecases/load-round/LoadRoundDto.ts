export interface InputLoadRoundDto {
    roundId: number
}

export interface OutputLoadRoundDto {
  round?: OutputLoadRoundRoundDto
}

export interface OutputLoadRoundRoundDto {
  id: number
  player_id: number
  questions: OutpuLoadRoundQuestionDto[]
}

export interface OutpuLoadRoundQuestionDto {
  id: number
  description: string
  options: OutputLoadRoundOptionsDto[]  
}

export interface OutputLoadRoundOptionsDto {
  id: number
  label: string
}