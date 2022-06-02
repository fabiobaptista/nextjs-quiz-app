import { HttpClient } from '@/data/protocols/Http'
import Category from '@/domain/categories/Categories'
import { InputLoadCategoriesDto, LoadCategoryDto, OutputLoadCategoriesDto } from './LoadCategoriesDto'

export default class LoadCategoriesUseCase {
  
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<OutputLoadCategoriesDto>
  ) {}

  async execute (input: InputLoadCategoriesDto): Promise<OutputLoadCategoriesDto> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })

    const result = httpResponse.body?.categories || []
    const categories = result.map((c: Category): LoadCategoryDto => ({
      id: c.id,
      name: c.name
    }))

    return { categories }
  }
}
