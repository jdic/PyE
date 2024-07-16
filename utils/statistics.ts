import type { Statistics } from '../types/generic'

export const getStatistics = (values: number[]): Statistics =>
{
  const n = values.length
  const sx = values.reduce((a, b) => a + b, 0)
  const mean = sx / n

  const variance = values.reduce((sum, value) =>
    sum + Math.pow(value - mean, 2), 0) / n
  const sDeviation = Math.sqrt(variance)

  const range =
  {
    min: mean - (3 * sDeviation),
    max: mean + (3 * sDeviation)
  }

  return { mean, sx, variance, sDeviation, range, n }
}

export const showStatistics = (statistics: Statistics) =>
{
  console.log('\nMean:', statistics.mean.toFixed(4))
  console.log('Sum:', statistics.sx)
  console.log('Variance:', statistics.variance.toFixed(4))
  console.log('Standard Deviation:', statistics.sDeviation.toFixed(4))
  console.log('Range:', statistics.range.min.toFixed(4), 'to', statistics.range.max.toFixed(4))
  console.log('n:', statistics.n)
}
