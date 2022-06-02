
import FetchHttpClient from '../../../infra/http/FetchHttpClient'
import 'isomorphic-fetch'
import { InputLoadRoundResultDto, OutputLoadRoundResultDto } from './LoadRoundResultDto'
import LoadRoundResultUseCase from './LoadRoundResultUseCase'
import { HttpRequest } from '@/data/protocols/Http'
import { OutputCreateRoundDto } from '../create-round/CreateRoundDto'
import { OutputSaveAnswerDto } from '../save-answer/SaveAnswerDto'

const urlApi  = `https://test-quiz-app-backend.herokuapp.com/rounds`
const httpClient = new FetchHttpClient()

const playerDataMock = {
  player_name: 'fabio',
  category_id: 3
}

const httpRequestMock: HttpRequest = {
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
}

describe('Test Integration Load Round Result Use Case', () => {

  test('should not returns round result', async () => {
    const input: InputLoadRoundResultDto = { roundId: 0}
    const usecase = new LoadRoundResultUseCase(`${urlApi}`, httpClient)

    const output: OutputLoadRoundResultDto = await usecase.execute(input)
    expect(output).toStrictEqual({})
  })

  test('should returns round result', async () => {

    // Create round and answer questions
    const reqCreate = await httpClient.request(httpRequestMock)

    const round: OutputCreateRoundDto = reqCreate.body

    expect(round.round?.id).toBeGreaterThan(0)
    
    const reqAnswer = await httpClient.request({
      ...httpRequestMock,
      url: `${urlApi}/${round.round?.id}/answers`,
      body: JSON.stringify({
        answer: {
        question_id: round.round?.questions[0].id,
        option_id: round.round?.questions[0].options[0].id
        }
      })
    })

    const answer: OutputSaveAnswerDto = reqAnswer.body

    expect(answer.answer?.id).toBeGreaterThan(0)
    expect(answer.answer?.question_id).toEqual(round.round?.questions[0].id)
    expect(answer.answer?.option_id).toEqual(round.round?.questions[0].options[0].id)

    // Load round result
    const input: InputLoadRoundResultDto = { roundId: round.round?.id || 0 }
    const usecase = new LoadRoundResultUseCase(urlApi, httpClient)

    const output: OutputLoadRoundResultDto = await usecase.execute(input)

    expect(output.round?.id).toBeGreaterThan(0)
    expect(output.round?.player_id).toBeGreaterThan(0)
    expect(output.round?.total_questions).toEqual(round.round?.questions.length)
    expect(output.round?.total_answered_questions).toEqual(1)
  })

})