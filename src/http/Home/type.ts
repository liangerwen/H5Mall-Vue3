export interface Seckill {
  goodList: Array<{
    price: number
    realPrice: number
    img: string
  }>
  time: number
}

export interface Menu {
  icon: string
  title: string
  url: string
}
