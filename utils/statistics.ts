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

    return { x, y, xy, xx, yy }
  })

  const sx = items.reduce((a, b) => a + b.x, 0)
  const sy = items.reduce((a, b) => a + b.y, 0)
  const sxx = items.reduce((a, b) => a + b.xx, 0)
  const syy = items.reduce((a, b) => a + b.yy, 0)
  const sxy = items.reduce((a, b) => a + b.xy, 0)

  return { n, sx, sy, sxx, syy, sxy, items }
}

export const showRegLin = (reg: IRegLin) =>
{
  const table = new Table({ head: ['#', 'x', 'y', 'xy', 'x²', 'y²'] })

  reg.items.forEach((item, index) => {
    table.push([index + 1, item.x, item.y, item.xy, item.xx, item.yy])
  })

  table.push(['Σ', reg.sx, reg.sy, reg.sxy, reg.sxx, reg.syy])

  console.log(table.toString(), '\n')
}
