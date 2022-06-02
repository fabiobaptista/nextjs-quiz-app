
import { InputLoadCategoriesDto, OutputLoadCategoriesDto } from './LoadCategoriesDto'
import LoadCategoriesUseCase from './LoadCategoriesUseCase'
import FetchHttpClient from '../../../infra/http/FetchHttpClient'
import 'isomorphic-fetch'

const urlApi  = `https://test-quiz-app-backend.herokuapp.com/categories`
const httpClient = new FetchHttpClient()
describe('Test Integration Load Categories Use Case', () => {
  test('should returns categories empty list', async () => {
    const input: InputLoadCategoriesDto = { }
    const usecase = new LoadCategoriesUseCase(`${urlApi}aaa`, httpClient)

    const output: OutputLoadCategoriesDto = await usecase.execute(input)
    expect(output.categories.length).toBe(0)
  })

  test('should returns categories empty list', async () => {
    const input: InputLoadCategoriesDto = { }
    const usecase = new LoadCategoriesUseCase(urlApi, httpClient)

    const output: OutputLoadCategoriesDto = await usecase.execute(input)

    expect(output.categories.length).toBeGreaterThan(0)
  })
})