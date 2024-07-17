import type { IStatistics } from '../types/generic'

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
  console.log('Sum (∑x):', statistics.sx)
  console.log('Variance (σ²):', statistics.variance.toFixed(4))
  console.log('sDeviation (σ):', statistics.sDeviation.toFixed(4))
  console.log('Min/Max (±3σ):', statistics.mm.min.toFixed(4), '-', statistics.mm.max.toFixed(4))
  console.log('n:', statistics.n)
  console.log('\n')
}
