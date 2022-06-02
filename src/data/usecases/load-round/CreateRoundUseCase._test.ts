import FetchHttpClient from '../../../infra/http/FetchHttpClient'
import { InputCreateRoundDto, OutpuCreateRoundQuestionDto, OutputCreateRoundDto } from './CreateRoundDto'
import CreateRoundUseCase from './CreateRoundUseCase'
import 'isomorphic-fetch'

const inputRoundMock: InputCreateRoundDto = {
    playerName: 'Fabio',
    categoryId: 3
}

const urlApi  = `https://test-quiz-app-backend.herokuapp.com/rounds`
