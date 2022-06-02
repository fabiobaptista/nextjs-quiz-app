import { HttpClient } from '@/data/protocols/Http'
import { InputSaveAnswerDto, OutputSaveAnswerDto } from './SaveAnswerDto'

export default class SaveAnswerUseCase {
  
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<OutputSaveAnswerDto>
  ) {}

  async execute (input: InputSaveAnswerDto): Promise<OutputSaveAnswerDto> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         asnwer: {
          question_id: input.questionId,
          option_id: input.optionId
        }
      })
    })

    const result = httpResponse.body?.round

    if(result) {
      return {
        round: {
          id: result.id,
          player_id: result.player_id,
          questions: result.questions,
          answers: result.answers
        }
      }
    }

    return {}
  }
}