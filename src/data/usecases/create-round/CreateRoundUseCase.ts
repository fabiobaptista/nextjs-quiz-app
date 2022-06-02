import { HttpClient } from '@/data/protocols/Http'
import Category from '@/domain/categories/Categories'
import { InputCreateRoundDto, OutputCreateRoundDto } from './CreateRoundDto'

export default class CreateRoundUsecase {
  
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<OutputCreateRoundDto>
  ) {}

  async execute (input: InputCreateRoundDto): Promise<OutputCreateRoundDto> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         round: {
          player_name: input.playerName,
          category_id: input.categoryId
        }
      })
    })

    const result = httpResponse.body?.round

    if(result) {
      return {
        round: {
          id: result.id,
          player_id: result.player_id,
          questions: result.questions
        }
      }
    }

    return {}
  }
}