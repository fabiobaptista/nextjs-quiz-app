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
      body: {
        round: {
          player_name: input.round.playerName,
          category_id: input.round.categoryId
        }
      }
    })

    const result = httpResponse.body?.round

    if(result) {
      return {
        round: {
          id: result.id,
          player_name: result.player_name,
          questions: result.questions
        }
      }
    }

    return {}
  }
}