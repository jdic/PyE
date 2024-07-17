import { getRegLin, showRegLin } from '../utils/regression'
import type { IXY } from '../types/Regression'
import { input } from '../utils/prompt'

const createObject = (item: string): IXY =>
{
  const [x, y] = item.split(',')

  return { x: parseFloat(x), y: parseFloat(y) }
}

export const RegLin = async (): Promise<void> =>
{
  const values = (await input('Values (|-| |):')).split(/[\s-]+/)
    .map(createObject)

  const regs = getRegLin(values)

  showRegLin(regs)
}
