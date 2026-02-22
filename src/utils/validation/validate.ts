import type { Rule } from './rules'

//declara los schemas dinamicamente
export type Schema<T> = {
  [K in keyof T]?: Rule<T[K]>[]
}

export function validate<T>(
  data: T,
  schema: Schema<T>
) {
  const errors: Partial<Record<keyof T, string>> = {}

  for (const key in schema) {

    const rules = schema[key]
    if (!rules) continue

    for (const rule of rules) {
      const error = rule(data[key], data)
      if (error) {
        errors[key] = error
        break
      }
    }
    
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}
