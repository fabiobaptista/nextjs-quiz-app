import { HttpClient } from '@/data/protocols/Http'
import { InputSaveAnswerDto, OutpuSaveAnswerQuestionDto, OutputSaveAnswerAnswerDto, OutputSaveAnswerDto } from './SaveAnswerDto'
import SaveAnswerUseCase from './SaveAnswerUseCase'

const inputRoundMock: InputSaveAnswerDto = {
    roundId: 1,
    questionId: 1,
    optionId: 1
}

const outputAnswermock: OutputSaveAnswerAnswerDto = {
  id: 1,
  question_id: 1,
  option_id: 1,
  correct: true
}

const outputSaveAnswerMock: OutputSaveAnswerDto = {
  answer: outputAnswermock
}

const httpClientMock = (): HttpClient => {
  return {
    request: jest.fn()
  }
}

describe('Test Save Answer Use Case', () => {
  test('should save a answer', async () => {
    const httpClient = httpClientMock()
    jest.spyOn(httpClient, 'request')
      .mockReturnValue(Promise.resolve({
        statusCode: 200,
        body: outputSaveAnswerMock
      }))

    const input: InputSaveAnswerDto = inputRoundMock
    const usecase = new SaveAnswerUseCase('http://fake.com', httpClient)

    const output: OutputSaveAnswerDto = await usecase.execute(input)

    expect(output.answer?.id).toBe(outputSaveAnswerMock.answer?.id)
    expect(output.answer?.question_id).toBe(outputSaveAnswerMock.answer?.question_id)
    expect(output.answer?.option_id).toBe(outputSaveAnswerMock.answer?.option_id)
    expect(output.answer?.correct).toBe(outputSaveAnswerMock.answer?.correct)
  })

  test('should returns empty when not save answer', async () => {
    const httpClient = httpClientMock()
    jest.spyOn(httpClient, 'request')
      .mockReturnValue(Promise.resolve({
        statusCode: 200,
        body: {}
      }))

    const input: InputSaveAnswerDto = inputRoundMock
    const usecase = new SaveAnswerUseCase('http://fake.com', httpClient)

    const output: OutputSaveAnswerDto = await usecase.execute(input)

    expect(output).toStrictEqual({})
  })
})