import HttpClientFactory from '../../../factory/HttpClientFactory'
import { InputLoadCategoriesDto, OutputLoadCategoriesDto } from './LoadCategoriesDto'
import LoadCategoriesUseCase from './LoadCategoriesUseCase'
import 'isomorphic-fetch'

const urlApi  = `https://test-quiz-app-backend.herokuapp.com/categories`

describe('Test Integration Load Categories Use Case', () => {
  test('should returns categories empty list', async () => {
    
    const httpClient = HttpClientFactory.Fetch()
    const input: InputLoadCategoriesDto = { }
    const usecase = new LoadCategoriesUseCase(`${urlApi}aaa`, httpClient)

    const output: OutputLoadCategoriesDto = await usecase.execute(input)

    expect(output.categories.length).toBe(0)
  })

  test('should returns categories empty list', async () => {
    
    const httpClient = HttpClientFactory.Fetch()
    const input: InputLoadCategoriesDto = { }
    const usecase = new LoadCategoriesUseCase(urlApi, httpClient)

    const output: OutputLoadCategoriesDto = await usecase.execute(input)

    expect(output.categories.length).toBeGreaterThan(0)
  })
})