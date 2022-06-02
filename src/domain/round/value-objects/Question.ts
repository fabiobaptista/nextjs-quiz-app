import { Option } from './Option'

export interface Question {
  id: number
  description: string
  options: Option[]
}