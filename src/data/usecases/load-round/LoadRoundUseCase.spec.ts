import { HttpClient } from '@/data/protocols/Http'
import { InputLoadRoundDto, OutpuLoadRoundQuestionDto, OutputLoadRoundDto } from './LoadRoundDto'
import LoadRoundUseCase from './LoadRoundUseCase'

const inputRoundMock: InputLoadRoundDto = {
    roundId: 1
}

const questions1Mock: OutpuLoadRoundQuestionDto = {
  id: 1,
  description: 'Question 1',
  options: [
    {
      id: 1,
      label: 'Option 1'
    },
  ]
}

const questions2Mock: OutpuLoadRoundQuestionDto = {
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

const outputCategoriesMock: OutputLoadRoundDto = {
  round: {
    id: 1,
    player_id: 1,
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

describe('Test Load Round Use Case', () => {
  test('should load a round', async () => {
    const httpClient = httpClientMock()
    jest.spyOn(httpClient, 'request')
      .mockReturnValue(Promise.resolve({
        statusCode: 200,
        body: outputCategoriesMock
      }))

    const input: InputLoadRoundDto = inputRoundMock
    const usecase = new LoadRoundUseCase('http://fake.com', httpClient)

    const output: OutputLoadRoundDto = await usecase.execute(input)

    expect(output).toBeDefined()
    expect(output.round?.id).toBe(outputCategoriesMock.round?.id)
    expect(output.round?.player_id).toBe(outputCategoriesMock.round?.player_id)
    expect(output.round?.questions.length).toBe(outputCategoriesMock.round?.questions.length)
    expect(output.round?.questions[0].id).toBe(outputCategoriesMock.round?.questions[0].id)
    expect(output.round?.questions[0].description).toBe(outputCategoriesMock.round?.questions[0].description)
    expect(output.round?.questions[0].options.length).toBe(outputCategoriesMock.round?.questions[0].options.length)
    expect(output.round?.questions[0].options[0].id).toBe(outputCategoriesMock.round?.questions[0].options[0].id)
    expect(output.round?.questions[0].options[0].label).toBe(outputCategoriesMock.round?.questions[0].options[0].label)
  })

  // test('should returns empty when not create round', async () => {
  //   const httpClient = httpClientMock()
  //   jest.spyOn(httpClient, 'request')
  //     .mockReturnValue(Promise.resolve({
  //       statusCode: 200,
  //       body: {}
  //     }))

  //   const input: InputCreateRoundDto = inputRoundMock
  //   const usecase = new CreateRoundUseCase('http://fake.com', httpClient)

  //   const output: OutputCreateRoundDto = await usecase.execute(input)

  //   expect(output).toStrictEqual({})
  // })
})