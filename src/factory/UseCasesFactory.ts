import CreateRoundUseCase from '@/data/usecases/create-round/CreateRoundUseCase'
import LoadCategoriesUseCase from '@/data/usecases/load-categories/LoadCategoriesUseCase'
import HttpClientFactory from './HttpClientFactory'

export default class UseCasesFactory {
  static createLoadCategories = (): LoadCategoriesUseCase => {
    return new LoadCategoriesUseCase(
      `${process.env.NEXT_PUBLIC_BASE_URL}/categories`,
      HttpClientFactory.Axios()
    )
  }

  static createCreateRound = (): CreateRoundUseCase => {
    return new CreateRoundUseCase(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rounds`,
      HttpClientFactory.Axios()
    )
  }
}