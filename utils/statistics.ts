import type { IStatistics, IRegLin, IRegLinItems, IXY } from '../types/Statistics'
import Table from 'cli-table3'

export const getStatistics = (values: number[]): IStatistics =>
{
  const n = values.length
  const sx = values.reduce((a, b) => a + b, 0)
  const mean = sx / n

  const variance = values.reduce((sum, value) =>
    sum + Math.pow(value - mean, 2), 0) / n
  const sDeviation = Math.sqrt(variance)

  const mm =
  {
    min: mean - (3 * sDeviation),
    max: mean + (3 * sDeviation)
  }

  return { mean, sx, variance, sDeviation, mm, n }
}

export const showStatistics = (statistics: IStatistics) =>
{
  console.log('\nMean (x\'):', statistics.mean.toFixed(4))
  console.log('Sum (Σx):', statistics.sx)
  console.log('Variance (σ²):', statistics.variance.toFixed(4))
  console.log('sDeviation (σ):', statistics.sDeviation.toFixed(4))
  console.log('Min/Max (±3σ):', statistics.mm.min.toFixed(4), '-', statistics.mm.max.toFixed(4))
  console.log('n:', statistics.n)
  console.log('\n')
}

export const getRegLin = (values: IXY[]): IRegLin =>
{
  const n = values.length

  const items: IRegLinItems[] = values.map((v) =>
  {
    const x = v.x
    const y = v.y
    const xy = x * y
    const xx = Math.pow(x, 2)
    const yy = Math.pow(y, 2)
    const errX = 0
    const errY = 0
    const errXY = 0
    const errXSquared = 0
    const errYSquared = 0

    return { x, y, xy, xx, yy, errX, errY, errXY, errXSquared, errYSquared }
  })

  const sx = items.reduce((a, b) => a + b.x, 0)
  const sy = items.reduce((a, b) => a + b.y, 0)
  const sxx = items.reduce((a, b) => a + b.xx, 0)
  const syy = items.reduce((a, b) => a + b.yy, 0)
  const sxy = items.reduce((a, b) => a + b.xy, 0)

  const meanX = sx / n
  const meanY = sy / n

  items.forEach((item, i) =>
  {
    const errX = parseFloat((item.x - meanX).toFixed(4))
    const errY = parseFloat((item.y - meanY).toFixed(4))
    const errXSquared = parseFloat(Math.pow(errX, 2).toFixed(4))
    const errYSquared = parseFloat(Math.pow(errY, 2).toFixed(4))
    const errXY = parseFloat((errX * errY).toFixed(4))

    items[i] = { ...item, errX, errY, errXY, errXSquared, errYSquared }
  })
  
  const serrX = parseFloat(items.reduce((a, b) => a + b.errX, 0).toFixed(4))
  const serrY = parseFloat(items.reduce((a, b) => a + b.errY, 0).toFixed(4))
  const serrXSquared = parseFloat(items.reduce((a, b) => a + b.errXSquared, 0).toFixed(4))
  const serrYSquared = parseFloat(items.reduce((a, b) => a + b.errYSquared, 0).toFixed(4))
  const serrXY = parseFloat(items.reduce((a, b) => a + b.errXY, 0).toFixed(4))

  return { n, sx, sy, sxx, syy, sxy, items, serrX, serrY, serrXY, serrXSquared, serrYSquared, meanX, meanY }
}

export const y = (b: number, m: number, x: number) =>
  b + (m * x)

export const b = (reg: IRegLin, m: number) =>
{
  const top = (reg.sxx * reg.sy) - (reg.sx * reg.sxy)
  const bottom = (reg.n * reg.sxx) - Math.pow(reg.sx, 2)

  return top / bottom
}

export const m = (reg: IRegLin) =>
{
  const top = (reg.n * reg.sxy) - (reg.sx * reg.sy)
  const bottom = (reg.n * reg.sxx) - Math.pow(reg.sx, 2)

  return top / bottom
}

export const r = (reg: IRegLin) =>
{
  const left = Math.sqrt(reg.serrXSquared)
  const right = Math.sqrt(reg.serrYSquared)

  return reg.serrXY / (left * right)
}

export const showRegLin = (reg: IRegLin) =>
{
  const table = new Table({ head: ['#', 'x', 'y', 'xy', 'x²', 'y²', '(x-x\')²', '(x-y\')²', '(x-x\')(x-y\')'] })

  reg.items.forEach((item, index) =>
  {
    table.push([index + 1, item.x, item.y, item.xy, item.xx, item.yy, item.errXSquared, item.errYSquared, item.errXY])
  })

  table.push(['Σ', reg.sx, reg.sy, reg.sxy, reg.sxx, reg.syy, reg.serrXSquared, reg.serrYSquared, reg.serrXY])

  console.log(table.toString(), '\n')
  console.log('n:', reg.n)
  console.log('Mean (x\'):', reg.meanX.toFixed(4))
  console.log('Mean (Y\'):', reg.meanY.toFixed(4))
  console.log('m:', m(reg).toFixed(4))
  console.log('b:', b(reg, m(reg)).toFixed(4))
  console.log('r:', r(reg).toFixed(4))
  console.log('\n')
}
