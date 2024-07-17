import { getStatistics, showStatistics } from '../utils/statistics'
import { getSplitted, toNumber } from '../utils/utils'
import type { IZ } from '../types/Statistics'
import { input } from '../utils/prompt'
import ztable from 'ztable'

export const ZScore = (value: string[], mean: number, sDeviation: number): IZ =>
{
  const valueToFind = parseFloat(value[1] ?? value[0])

  const base = (valueToFind - mean) / sDeviation
  let z = base

  if (value[0] === '>')
    z += 0.5
  else if (value[0] === '<')
    z -= 0.5

  return { base, z }
}

export const Z = async (): Promise<void> =>
{
  const values = toNumber(getSplitted(await input('Values (,|-| |):')))
  const stats = getStatistics(values)

  showStatistics(stats)

  while (true)
  {
    const value = await input('Z for (>|<|q| |):')

    if (value === 'q')
      break

    const z = ZScore(getSplitted(value), stats.mean, stats.sDeviation)
    const zValue = ztable(z.z) - 0.5

    console.log(`Z: ${z.base.toFixed(4)}`)
  
    if (z.base !== z.z)
      console.log(`Z (±): ${z.z.toFixed(4)}`)

    console.log(`%: ${zValue.toFixed(4)} ≈ ${(Math.abs(zValue * 100)).toFixed(2)}%`)
    console.log('\n')
  }
}
