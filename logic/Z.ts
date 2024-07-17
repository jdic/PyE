import { getStatistics, showStatistics } from '../utils/statistics'
import { getSplitted, toNumber } from '../utils/utils'
import type { IZ } from '../types/generic'
import { input } from '../utils/prompt'

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
    const value = await input('Z for (>|<| |):')

    if (value === 'exit')
      break

    const z = ZScore(getSplitted(value), stats.mean, stats.sDeviation)

    console.log(`Z: ${z.base.toFixed(4)}`)
  
    if (z.base !== z.z)
      console.log(`Z (±): ${z.z.toFixed(4)}`)

    console.log('\n')
  }
}
