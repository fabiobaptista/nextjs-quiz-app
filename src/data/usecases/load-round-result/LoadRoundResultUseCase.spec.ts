import { HttpClient, HttpRequest } from '@/data/protocols/Http'
import { InputLoadRoundResultDto, OutputLoadRoundResultDto } from './LoadRoundResultDto'
import LoadRoundResultUseCase from './LoadRoundResultUseCase'

const inputRoundResultMock: InputLoadRoundResultDto = {
  roundId: 1
}

const outputRoundResultMock: OutputLoadRoundResultDto = {
  round: {
    id: 1,
    player_id: 1,
    total_questions: 5,
    total_answered_questions: 5,
    total_correct_answers: 3
  }
}

const httpClientMock = (): HttpClient => {
  return {
    request: jest.fn()
  }
}

describe('Test Load Round Result Use Case', () => {
  test('should returns categories empty list', async () => {
    const httpClient = httpClientMock()
    jest.spyOn(httpClient, 'request')
      .mockReturnValue(Promise.resolve({
        statusCode: 200,
        body: {}
      }))

    const input: InputLoadRoundResultDto = { roundId: 0 }
    const usecase = new LoadRoundResultUseCase('http://fake.com', httpClient)

    const output: OutputLoadRoundResultDto = await usecase.execute(input)

    expect(output).toStrictEqual({})
  })

  test('should list all categories', async () => {
    const httpClient = httpClientMock()
    jest.spyOn(httpClient, 'request')
      .mockReturnValue(Promise.resolve({
        statusCode: 200,
        body: outputRoundResultMock
      }))

    const input: InputLoadRoundResultDto = inputRoundResultMock
    const usecase = new LoadRoundResultUseCase('http://fake.com', httpClient)

    const output: OutputLoadRoundResultDto = await usecase.execute(input)

    expect(output.round?.id).toBe(outputRoundResultMock.round?.id)
    expect(output.round?.player_id).toBe(outputRoundResultMock.round?.player_id)
    expect(output.round?.total_answered_questions).toBe(outputRoundResultMock.round?.total_answered_questions)
    expect(output.round?.total_correct_answers).toBe(outputRoundResultMock.round?.total_correct_answers)
    expect(output.round?.total_questions).toBe(outputRoundResultMock.round?.total_questions)
  })
})