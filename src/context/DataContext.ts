export default interface DataContext {
  isBusy: boolean
  name: string
  category: string,
  playerId: number,
  roundId: number,
  updateIsBusy: (value: boolean) => void
  updateName: (value: string) => void
  updateCategory: (value: string) => void
  updatePlayer: (value: number) => void
  updateRound: (value: number) => void
}

export const DataContextInitialValues: DataContext = {
  isBusy: false,
  name: '',
  category: '1',
  playerId: 0,
  roundId: 0,
  updateIsBusy: () => ({}),
  updateName: () => ({}),
  updateCategory: () => ({}),
  updatePlayer: () => ({}),
  updateRound: () => ({}),
}