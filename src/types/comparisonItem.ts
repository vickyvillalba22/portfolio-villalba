export type ComparisonItem = {
  id: 'complexity' | 'learning' | 'scalability'
  title: string
  description: string
  chart: 'bars' | 'curve' | 'growth'
  data: ChartData
}

export type BarsData = {
  vue: number
  vanilla: number
}

export type CurveData = {
  vuePath: string
  vanillaPath: string
}

export type GrowthData = {
  path: string
}

export type ChartData = BarsData | CurveData | GrowthData