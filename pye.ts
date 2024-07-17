import select, { Separator } from '@inquirer/select'
import { RegLin } from './logic/RegLin'
import { Z } from './logic/Z'

console.clear()

const choices: any =
[
  {
    name: 'Z',
    value: Z
  },
  {
    name: 'Reg. Lin.',
    value: RegLin
  },
  new Separator(),
  {
    name: 'Exit',
    value: 'exit'
  },
]

;(async () =>
{
  while (true)
  {
    const answer = await select({ message: 'Option', choices })

    if (typeof answer === 'function')
      await answer()
    else if (answer === 'exit')
      process.exit(0)
  }
})()
