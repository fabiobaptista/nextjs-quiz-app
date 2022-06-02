import CreateRoundUseCase from '@/data/usecases/create-round/CreateRoundUseCase'
import LoadCategoriesUseCase from '@/data/usecases/load-categories/LoadCategoriesUseCase'
import LoadRoundUseCase from '@/data/usecases/load-round/LoadRoundUseCase'
import SaveAnswerUseCase from '@/data/usecases/save-answer/SaveAnswerUseCase'
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

  static createLoadRound = (): LoadRoundUseCase => {
    return new LoadRoundUseCase(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rounds`,
      HttpClientFactory.Axios()
    )
  }

  static createSaveAnswer = (): SaveAnswerUseCase => {
    return new SaveAnswerUseCase(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rounds`,
      HttpClientFactory.Axios()
    )
  }
}