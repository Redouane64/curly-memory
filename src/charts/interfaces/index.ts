export interface WeekEntry {
  week: number
  open: number
  close: number
  low: number
  high: number
}

export interface CandlestickDto {
  year: number
  entries: WeekEntry[]
}
