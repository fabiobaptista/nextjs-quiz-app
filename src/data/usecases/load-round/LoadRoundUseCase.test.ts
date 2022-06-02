import FetchHttpClient from '../../../infra/http/FetchHttpClient'
import { HttpClient } from '@/data/protocols/Http'
import { InputLoadRoundDto, OutpuLoadRoundQuestionDto, OutputLoadRoundDto } from './LoadRoundDto'
import LoadRoundUseCase from './LoadRoundUseCase'
import 'isomorphic-fetch'

const urlApi  = `https://test-quiz-app-backend.herokuapp.com/rounds`
const httpClient = new FetchHttpClient()

const playerDataMock = {
    player_name: 'fabio',
    category_id: 3
}

describe('Test Load Round Use Case', () => {
  test('should load a round', async () => {

    const reqCreate = await httpClient.request({
        url: urlApi,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            round: {
                ...playerDataMock
            }
        }),
    })

    const round:any = reqCreate.body

    expect(round.round.id).toBeGreaterThan(0)

    const input: InputLoadRoundDto = { roundId: round.round.id }
    const usecase = new LoadRoundUseCase(urlApi, httpClient)

    const output: OutputLoadRoundDto = await usecase.execute(input)

     expect(output.round?.id).toEqual(input.roundId)
     expect(output.round?.player_id).toEqual(round.round.player_id)
     expect(output.round?.questions.length).toBeGreaterThan(0)
     expect(output.round?.questions[0].id).toBe(round.round.questions[0].id)
     expect(output.round?.questions[0].description).toBe(round.round.questions[0].description)
     expect(output.round?.questions[0].options.length).toBe(round.round.questions[0].options.length)
     expect(output.round?.questions[0].options[0].id).toBe(round.round.questions[0].options[0].id)
     expect(output.round?.questions[0].options[0].label).toBe(round.round.questions[0].options[0].label)
  })

  test('should returns empty when not create round', async () => {
    const input: InputLoadRoundDto = { roundId: 0 }
    const usecase = new LoadRoundUseCase(urlApi, httpClient)

    const output: OutputLoadRoundDto = await usecase.execute(input)
    expect(output).toStrictEqual({})
  })

  //TODO - implement test to: answers
})