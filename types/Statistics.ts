export interface IRange
{
  min: number
  max: number
}

export interface IStatistics
{
  mean: number
  sx: number
  variance: number
  sDeviation: number
  mm: IRange
  n: number
}

export interface IZ
{
  base: number
  z: number
}
