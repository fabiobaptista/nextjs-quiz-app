import { HttpClient } from '@/data/protocols/Http'
import { InputCreateRoundDto, OutpuCreateRoundQuestionDto, OutputCreateRoundDto } from './CreateRoundDto'
import CreateRoundUseCase from './CreateRoundUseCase'


const inputRoundMock: InputCreateRoundDto = {
  round: {
    playerName: 'Player 1',
    categoryId: 1
  }
}

const questions1Mock: OutpuCreateRoundQuestionDto = {
  id: 1,
  description: 'Question 1',
  options: [
    {
      id: 1,
      label: 'Option 1'
    },
  ]
}

const questions2Mock: OutpuCreateRoundQuestionDto = {
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

const outputCategoriesMock: OutputCreateRoundDto = {
  round: {
    id: 1,
    player_name: inputRoundMock.round.playerName,
    questions: [
      questions1Mock,
      questions2Mock
    ]
  }
}

const httpClientMock = (): HttpClient => {
  return {
    request: jest.fn()
  }
}

describe('Test Create Round Use Case', () => {
  test('should create a round', async () => {
    const httpClient = httpClientMock()
    jest.spyOn(httpClient, 'request')
      .mockReturnValue(Promise.resolve({
        statusCode: 200,
        body: outputCategoriesMock
      }))

    const input: InputCreateRoundDto = inputRoundMock
    const usecase = new CreateRoundUseCase('http://fake.com', httpClient)

    const output: OutputCreateRoundDto = await usecase.execute(input)

    expect(output).toBeDefined()
    expect(output.round?.id).toBe(outputCategoriesMock.round?.id)
    expect(output.round?.player_name).toBe(outputCategoriesMock.round?.player_name)
    expect(output.round?.questions.length).toBe(outputCategoriesMock.round?.questions.length)
    expect(output.round?.questions[0].id).toBe(outputCategoriesMock.round?.questions[0].id)
    expect(output.round?.questions[0].description).toBe(outputCategoriesMock.round?.questions[0].description)
    expect(output.round?.questions[0].options.length).toBe(outputCategoriesMock.round?.questions[0].options.length)
    expect(output.round?.questions[0].options[0].id).toBe(outputCategoriesMock.round?.questions[0].options[0].id)
    expect(output.round?.questions[0].options[0].label).toBe(outputCategoriesMock.round?.questions[0].options[0].label)
  })

  test('should returns empty when not create round', async () => {
    const httpClient = httpClientMock()
    jest.spyOn(httpClient, 'request')
      .mockReturnValue(Promise.resolve({
        statusCode: 200,
        body: {}
      }))

    const input: InputCreateRoundDto = inputRoundMock
    const usecase = new CreateRoundUseCase('http://fake.com', httpClient)

    const output: OutputCreateRoundDto = await usecase.execute(input)

    expect(output).toStrictEqual({})
  })
})