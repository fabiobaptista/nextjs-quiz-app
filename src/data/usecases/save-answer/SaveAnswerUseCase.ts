import { HttpClient } from '@/data/protocols/Http'
import { InputSaveAnswerDto, OutputSaveAnswerDto } from './SaveAnswerDto'

export default class SaveAnswerUseCase {
  
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<OutputSaveAnswerDto>
  ) {}

  async execute (input: InputSaveAnswerDto): Promise<OutputSaveAnswerDto> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${input.roundId}/answers`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         answer: {
          question_id: input.questionId,
          option_id: input.optionId
        }
      })
    })

    const result = httpResponse.body?.answer

    if(result) {
      return {
        answer: {
          id: result.id,
          question_id: result.question_id,
          option_id: result.option_id,
          correct: result.correct
        }
      }
    }

    return {}
  }
}