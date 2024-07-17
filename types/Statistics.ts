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

export interface IXY
{
  x: number
  y: number 
}

export interface IRegLinItems
{
  x: number
  y: number
  xy: number
  xx: number
  yy: number
}

export interface IRegLin
{
  n: number
  sx: number
  sy: number
  sxx: number
  syy: number
  sxy: number
  items: IRegLinItems[]
}
