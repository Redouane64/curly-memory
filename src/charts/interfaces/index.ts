export interface WeekEntry {
  week: number
  open_price: number
  close_price: number
  min_price: number
  max_price: number
}

export interface CandlestickDto {
  year: number
  entries: WeekEntry[]
}
