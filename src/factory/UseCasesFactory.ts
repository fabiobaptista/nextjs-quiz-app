import LoadCategoriesUseCase from '@/data/usecases/load-categories/LoadCategoriesUseCase'
import HttpClientFactory from './HttpClientFactory'

export default class UseCasesFactory {
  static createLoadCategoriesUseCase = (): LoadCategoriesUseCase => {
    return new LoadCategoriesUseCase(
      `${process.env.NEXT_PUBLIC_BASE_URL}categories`,
      HttpClientFactory.Fetch()
    )
  }
}