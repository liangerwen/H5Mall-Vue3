interface CategoryItem {
  title: string
  list: Array<{ title: string; img: string }>
}

export interface Category {
  title: string
  list: CategoryItem[]
}
