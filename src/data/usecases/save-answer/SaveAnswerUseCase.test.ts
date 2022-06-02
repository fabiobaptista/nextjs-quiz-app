import FetchHttpClient from '../../../infra/http/FetchHttpClient'
import 'isomorphic-fetch'
import { InputCreateRoundDto } from '../create-round/CreateRoundDto'
import { InputSaveAnswerDto, OutputSaveAnswerDto } from './SaveAnswerDto'
import SaveAnswerUseCase from './SaveAnswerUseCase'

const playerDataMock = {
  player_name: 'fabio',
  category_id: 3
}

const urlApi  = `https://test-quiz-app-backend.herokuapp.com/rounds`
const httpClient = new FetchHttpClient()

describe('Test Create Round Use Case', () => {
  test('should create a round', async () => {

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
  expect(round.round.answers.length).toEqual(0)
  
    const input: InputSaveAnswerDto = {
      roundId: round.round.id,
      questionId: round.round.questions[0].id,
      optionId: round.round.questions[0].options[0].id
    }

    const usecase = new SaveAnswerUseCase(urlApi, httpClient)

    const output: OutputSaveAnswerDto = await usecase.execute(input)

    expect(output.answer?.id).toBeGreaterThan(0)
    expect(output.answer?.option_id).toBe(round.round.questions[0].options[0].id)
  })

  test('should not create a round', async () => {

    const input: InputSaveAnswerDto = { 
      roundId: 0,
      questionId: 0,
      optionId: 0
    }
    const usecase = new SaveAnswerUseCase(urlApi, httpClient)

    const output: OutputSaveAnswerDto = await usecase.execute(input)

    expect(output).toStrictEqual({})
  })
})