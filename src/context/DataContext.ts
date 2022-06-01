export default interface DataContext {
  name: string
  category: string
  updateName: (value: string) => void
  updateCategory: (value: string) => void
}

export const DataContextInitialValues: DataContext = {
  name: '',
  category: '1',
  updateName: () => ({}),
  updateCategory: () => ({}),
}