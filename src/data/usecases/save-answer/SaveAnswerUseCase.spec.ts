import { HttpClient } from '@/data/protocols/Http'
import { InputSaveAnswerDto, OutpuSaveAnswerQuestionDto, OutputSaveAnswerAnswerDto, OutputSaveAnswerDto } from './SaveAnswerDto'
import SaveAnswerUseCase from './SaveAnswerUseCase'

const inputRoundMock: InputSaveAnswerDto = {
    roundId: 1,
    questionId: 1,
    optionId: 1
}

const questions1Mock: OutpuSaveAnswerQuestionDto = {
  id: 1,
  description: 'Question 1',
  options: [
    {
      id: 1,
      label: 'Option 1'
    },
  ]
}

const questions2Mock: OutpuSaveAnswerQuestionDto = {
  id: 2,
  description: 'Question 2',
  options: [
    {
      id: 2,
      label: 'Option 2'
    },
    {
      id: 3,
      label: 'Option 3'
    },
  ]
}

const outputAnswermock: OutputSaveAnswerAnswerDto = {
  id: 1,
  question_id: 1,
  option_id: 1,
  correct: true
}

const outputSaveAnswerMock: OutputSaveAnswerDto = {
  round: {
    id: 1,
    player_id: 1,
    questions: [
      questions1Mock,
      questions2Mock
    ],
    answers: [
      outputAnswermock
    ]
  }
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

    expect(output).toBeDefined()
    expect(output.round?.id).toBe(outputSaveAnswerMock.round?.id)
    expect(output.round?.questions.length).toBe(outputSaveAnswerMock.round?.questions.length)
    expect(output.round?.answers.length).toBe(outputSaveAnswerMock.round?.answers.length)
    expect(output.round?.answers[0].id).toBe(outputSaveAnswerMock.round?.answers[0].id)
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