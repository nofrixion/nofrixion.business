import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

import { builtClassesPrefix } from './constants'

const isBuilt = import.meta.env.PROD

const customTwMerge = extendTailwindMerge({
  prefix: isBuilt ? builtClassesPrefix : '',
})

export const cn = (...inputs: ClassValue[]) => customTwMerge(clsx(inputs))
