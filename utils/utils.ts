export const isNotEmpty = (value: string) =>
  value ? true : 'This field is required'

export const getSplitted = (value: string) => value
  .split(/[\s,/-]+/)
  .map((item) => item.trim())

export const toNumber = (value: string[]) => value
  .map(parseFloat)
  .filter((item) => !isNaN(item))
