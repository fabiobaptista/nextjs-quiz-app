import FetchHttpClient from '../../../infra/http/FetchHttpClient'
import { InputCreateRoundDto, OutpuCreateRoundQuestionDto, OutputCreateRoundDto } from './CreateRoundDto'
import CreateRoundUseCase from './CreateRoundUseCase'
import 'isomorphic-fetch'

const inputRoundMock: InputCreateRoundDto = {
  round: {
    playerName: 'Fabio',
    categoryId: 3
  }
}

const urlApi  = `https://test-quiz-app-backend.herokuapp.com/rounds`
const httpClient = new FetchHttpClient()

describe('Test Create Round Use Case', () => {
  test('should create a round', async () => {

    const input: InputCreateRoundDto = inputRoundMock
    const usecase = new CreateRoundUseCase(urlApi, httpClient)

    const output: OutputCreateRoundDto = await usecase.execute(input)

    expect(output).toBeDefined()
    expect(output.round?.id).toBeGreaterThan(0)
    expect(output.round?.questions.length).toBeGreaterThan(0)
    expect(output.round?.questions[0].options.length).toBeGreaterThan(0)
    
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