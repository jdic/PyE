import { input } from '../utils/prompt'
import { getStatistics, showStatistics } from '../utils/statistics'
import { getSplitted, toNumber } from '../utils/utils'

export const ZScore = (value: string[], mean: number, sDeviation: number): number =>
{
  const valueToFind = parseFloat(value[1] ?? value[0])

  let z = (valueToFind - mean) / sDeviation

  if (value[0] === '>')
    z += 0.5
  else if (value[0] === '<')
    z -= 0.5

  return z
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
    console.log('Z:'.cyan, z.toFixed(4))
  }
}
