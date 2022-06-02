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

  // test('should list all categories', async () => {
  //   const httpClient = httpClientMock()
  //   jest.spyOn(httpClient, 'request')
  //     .mockReturnValue(Promise.resolve({
  //       statusCode: 200,
  //       body: outpuCategoriesMock
  //     }))

  //   const input: InputLoadCategoriesDto = { }
  //   const usecase = new LoadCategoriesUseCase('http://fake.com', httpClient)

  //   const output: OutputLoadCategoriesDto = await usecase.execute(input)

  //   expect(output.categories.length).toBe(2)

  //   expect(output.categories[0].id).toBe(category1.id)
  //   expect(output.categories[0].name).toBe(category1.name)
    
  //   expect(output.categories[1].id).toBe(category2.id)
  //   expect(output.categories[1].name).toBe(category2.name)
  // })
})