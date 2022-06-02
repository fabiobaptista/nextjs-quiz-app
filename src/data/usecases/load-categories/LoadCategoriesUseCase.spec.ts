import { HttpClient, HttpRequest } from '@/data/protocols/Http'
import { InputLoadCategoriesDto, OutputLoadCategoriesDto } from './LoadCategoriesDto'
import LoadCategoriesUseCase from './LoadCategoriesUseCase'

const category1 = {
  id: 1,
  name: 'Category 1',
}

const category2 = {
  id: 2,
  name: 'Category 2',
}

const outpuCategoriesMock: OutputLoadCategoriesDto = {
  categories: [
    category1,
    category2
  ]
}

const httpClientMock = (): HttpClient => {
  return {
    request: jest.fn()
  }
}

describe('Test Load Categories Use Case', () => {
  test('should returns categories empty list', async () => {
    const httpClient = httpClientMock()
    jest.spyOn(httpClient, 'request')
      .mockReturnValue(Promise.resolve({
        statusCode: 200,
        body: []
      }))

    const input: InputLoadCategoriesDto = { }
    const usecase = new LoadCategoriesUseCase('http://fake.com', httpClient)

    const output: OutputLoadCategoriesDto = await usecase.execute(input)

    expect(output.categories.length).toBe(0)
  })

  test('should list all categories', async () => {
    const httpClient = httpClientMock()
    jest.spyOn(httpClient, 'request')
      .mockReturnValue(Promise.resolve({
        statusCode: 200,
        body: outpuCategoriesMock
      }))

    const input: InputLoadCategoriesDto = { }
    const usecase = new LoadCategoriesUseCase('http://fake.com', httpClient)

    const output: OutputLoadCategoriesDto = await usecase.execute(input)

    expect(output.categories.length).toBe(2)

    expect(output.categories[0].id).toBe(category1.id)
    expect(output.categories[0].name).toBe(category1.name)
    
    expect(output.categories[1].id).toBe(category2.id)
    expect(output.categories[1].name).toBe(category2.name)
  })
})