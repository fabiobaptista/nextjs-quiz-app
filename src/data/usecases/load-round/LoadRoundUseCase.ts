import { HttpClient } from '@/data/protocols/Http'
import { InputLoadRoundDto, OutputLoadRoundDto } from './LoadRoundDto'

export default class LoadRoundUseCase {
  
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<OutputLoadRoundDto>
  ) {}

  async execute (input: InputLoadRoundDto): Promise<OutputLoadRoundDto> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${input.roundId}`,
      method: 'get'
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