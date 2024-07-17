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
  errX: number
  errY: number
  errXY: number
  errXSquared: number
  errYSquared: number
}

export interface IRegLin
{
  n: number
  sx: number
  sy: number
  sxx: number
  syy: number
  sxy: number
  serrX: number
  serrY: number
  serrXY: number
  serrXSquared: number
  serrYSquared: number
  meanX: number
  meanY: number
  items: IRegLinItems[]
}
