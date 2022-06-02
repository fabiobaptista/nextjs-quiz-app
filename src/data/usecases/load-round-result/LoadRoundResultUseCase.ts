import { HttpClient } from '@/data/protocols/Http'
import { InputLoadRoundResultDto, OutputLoadRoundResultDto } from './LoadRoundResultDto'

export default class LoadRoundResultUseCase {
  
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<OutputLoadRoundResultDto>
  ) {}

  async execute (input: InputLoadRoundResultDto): Promise<OutputLoadRoundResultDto> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${input.roundId}/result`,
      method: 'get'
    })

    const result = httpResponse.body || {}

    return result
  }
}
