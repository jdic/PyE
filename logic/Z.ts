import { getStatistics, showStatistics } from '../utils/statistics'
import { getSplitted, toNumber } from '../utils/utils'
import type { IZ } from '../types/Statistics'
import { input } from '../utils/prompt'
import ztable from 'ztable'

export const ZScore = (value: string[], mean: number, sDeviation: number): IZ =>
{
  const valueToFind = parseFloat(value[1] ?? value[0])

  const base = (valueToFind - mean) / sDeviation
  const zscore = Math.abs(ztable(base) - 0.5)

  let newZScore = zscore

  if (value[0] === '>')
    newZScore -= 0.5
  else if (value[0] === '<')
    newZScore += 0.5
  
  newZScore = Math.abs(newZScore)

  return { base, zscore, newZScore }
}

export const drawNormalDistribution = (mean: number, sDeviation: number, z: number, direction: string): void =>
{
  const size = { width: 36, height: 7 }
  const center = Math.floor(size.width / 2)
  const scale = sDeviation * 3 / center
  const zPos = Math.floor((z * sDeviation + mean - mean) / scale + center)

  const graph: string[] = []

  for (let y = 0; y < size.height; y++)
  {
    const line: string[] = []

    for (let x = 0; x < size.width; x++)
    {
      const xPos = (x - center) * scale
      const gauss = Math.exp(-0.5 * Math.pow(xPos / sDeviation, 2))
      const gaussScaled = Math.floor(gauss * size.height * 0.6)

      if ((size.height - y) <= gaussScaled)
      {
        if ((direction === '>' && x >= zPos) || (direction === '<' && x <= zPos))
          line.push('🟦')

        else
          line.push('⬜')
      }

      else
        line.push('⬛')
    }

    graph.push(line.join(''))
  }

  console.log(graph.join('\n'))
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

    console.log(`Z: ${z.base.toFixed(4)}`)
  
    if (z.base !== z.zscore)
      console.log(`Z (±): ${z.zscore.toFixed(4)}`)

    console.log(`%: ${z.newZScore.toFixed(4)} ≈ ${(Math.abs(z.newZScore * 100)).toFixed(2)}%`)
    console.log('\n')

    drawNormalDistribution(stats.mean, stats.sDeviation, z.base, value[0])
  }
}
