import type { IStatistics } from '../types/Statistics'

export const getStatistics = (values: number[]): IStatistics =>
{
  const sx = values.reduce((a, b) => a + b, 0)
  const n = values.length
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

export const showStatistics = ({ mean, sx, variance, sDeviation, mm, n }: IStatistics) =>
{
  console.log('\n')
  console.log(`Mean (x'): ${mean.toFixed(4)}`)
  console.log(`Sum (Σx): ${sx}`)
  console.log(`Variance (σ²): ${variance.toFixed(4)}`)
  console.log(`sDeviation (σ): ${sDeviation.toFixed(4)}`)
  console.log(`Min/Max (±3σ): ${mm.min.toFixed(4)} - ${mm.max.toFixed(4)}`)
  console.log(`n: ${n}`)
  console.log('\n')
}
