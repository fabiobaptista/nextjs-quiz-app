export interface InputLoadCategoriesDto {}

export interface OutputLoadCategoriesDto {
  categories: LoadCategoryDto[]
}

export interface LoadCategoryDto {
  id: number
  name: string
}