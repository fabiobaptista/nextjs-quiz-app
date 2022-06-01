export default interface DataContext {
  isBusy: boolean
  name: string
  category: string
  updateIsBusy: (value: boolean) => void
  updateName: (value: string) => void
  updateCategory: (value: string) => void
}

export const DataContextInitialValues: DataContext = {
  isBusy: false,
  name: '',
  category: '1',
  updateIsBusy: () => ({}),
  updateName: () => ({}),
  updateCategory: () => ({}),
}