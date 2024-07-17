import type { IRegLin, IRegLinItems, IXY } from '../types/Regression'
import Table from 'cli-table3'

const calculateSum = (items: IRegLinItems[], key: keyof IRegLinItems): number => 
  parseFloat(items.reduce((sum, item) => sum + item[key], 0).toFixed(4))

const calculateMeans = (sx: number, sy: number, n: number) =>
(
  {
    meanX: sx / n,
    meanY: sy / n
  }
)

const calculateError = (items: IRegLinItems[], meanX: number, meanY: number) => 
  items.map(item =>
  {
    const errX = parseFloat((item.x - meanX).toFixed(4))
    const errY = parseFloat((item.y - meanY).toFixed(4))
    const errXSquared = parseFloat(Math.pow(errX, 2).toFixed(4))
    const errYSquared = parseFloat(Math.pow(errY, 2).toFixed(4))
    const errXY = parseFloat((errX * errY).toFixed(4))

    return { ...item, errX, errY, errXSquared, errYSquared, errXY }
  })

const calculateRegLinParams = (reg: IRegLin, mValue: number) =>
{
  const bValue = (reg.sxx * reg.sy - reg.sx * reg.sxy) / (reg.n * reg.sxx - Math.pow(reg.sx, 2))
  const rValue = Math.abs(reg.serrXY / (Math.sqrt(reg.serrXSquared) * Math.sqrt(reg.serrYSquared)))
  
  return { mValue, bValue, rValue }
}

export const getRegLin = (values: IXY[]): IRegLin =>
{
  const n = values.length
  const items: IRegLinItems[] = values.map(({ x, y }) =>
  (
    {
      x, y, xy: x * y, xx: Math.pow(x, 2), yy: Math.pow(y, 2), errX: 0, errY: 0, errXY: 0, errXSquared: 0, errYSquared: 0
    }
  ))

  const sx = calculateSum(items, 'x')
  const sy = calculateSum(items, 'y')
  const sxx = calculateSum(items, 'xx')
  const syy = calculateSum(items, 'yy')
  const sxy = calculateSum(items, 'xy')

  const { meanX, meanY } = calculateMeans(sx, sy, n)
  const updatedItems = calculateError(items, meanX, meanY)

  const serrX = calculateSum(updatedItems, 'errX')
  const serrY = calculateSum(updatedItems, 'errY')
  const serrXSquared = calculateSum(updatedItems, 'errXSquared')
  const serrYSquared = calculateSum(updatedItems, 'errYSquared')
  const serrXY = calculateSum(updatedItems, 'errXY')

  return { n, sx, sy, sxx, syy, sxy, items: updatedItems, serrX, serrY, serrXY, serrXSquared, serrYSquared, meanX, meanY }
}

export const y = (b: number, m: number, x: number): number =>
  b + (m * x)

export const m = (reg: IRegLin): number =>
  (reg.n * reg.sxy - reg.sx * reg.sy) / (reg.n * reg.sxx - Math.pow(reg.sx, 2))

export const r = (reg: IRegLin): number =>
  reg.serrXY / (Math.sqrt(reg.serrXSquared) * Math.sqrt(reg.serrYSquared))

export const showRegLin = (reg: IRegLin): void =>
{
  const table = new Table({ head: ['#', 'x', 'y', 'xy', 'x²', 'y²', '(x-x\')²', '(x-y\')²', '(x-x\')(x-y\')'] })

  reg.items.forEach((item, index) =>
  {
    table.push([index + 1, item.x, item.y, item.xy, item.xx, item.yy, item.errXSquared, item.errYSquared, item.errXY])
  })

  table.push(['Σ', reg.sx, reg.sy, reg.sxy, reg.sxx, reg.syy, reg.serrXSquared, reg.serrYSquared, reg.serrXY])

  const mValue = m(reg)
  const { bValue, rValue } = calculateRegLinParams(reg, mValue)

  console.log(table.toString(), '\n')
  console.log(`n: ${reg.n}`)
  console.log(`Mean (x'): ${reg.meanX.toFixed(4)}`)
  console.log(`Mean (Y'): ${reg.meanY.toFixed(4)}`)
  console.log(`m: ${mValue.toFixed(4)}`)
  console.log(`b: ${bValue.toFixed(4)}`)
  console.log(`r: ${rValue.toFixed(4)}`)
  console.log(`Correlation: ${rValue >= 0.7 ? 'Strong' : rValue >= 0.5 ? 'Moderate' : 'Weak'}`)
  console.log('\n')
}
