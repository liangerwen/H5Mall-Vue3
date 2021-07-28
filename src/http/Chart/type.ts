interface ChartItem {
  goodName: string
  goodId: string
  goodType: Array<{
    id: string
    name: string
  }>
  img: string
  price: number
  count: number
}

export interface Chart {
  shopName: string
  shopId: string
  showCoupon: boolean
  goodsList: ChartItem[]
}
