import { input as Input, select as Select } from '@inquirer/prompts'
import { isNotEmpty } from './utils'

export const input = async (message: string) =>
  await Input({ message, validate: isNotEmpty })

export const select = async (choices: any, message: string) =>
  await Select({ choices, message })
