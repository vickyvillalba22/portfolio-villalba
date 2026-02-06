// utils/validation/rules.ts
export type Rule<T = any> = (value: T, data?: any) => string | null

export const required = (msg = 'Campo obligatorio'): Rule =>
  value => (value === null || value === undefined || value === '' ? msg : null)

export const minLength = (min: number, msg?: string): Rule<string> =>
  value => value.length < min ? msg ?? `Mínimo ${min} caracteres` : null

export const isEmail: Rule<string> = value =>
  /^\S+@\S+\.\S+$/.test(value) ? null : 'Email inválido'

export const noFutureDate: Rule<string> = value => {
  if (!value) return null
  const today = new Date().toISOString().split('T')[0]
  return value > today ? 'La fecha no puede ser futura' : null
}

export const matchField = (field: string, msg = 'No coincide'): Rule =>
  (value, data) => value !== data[field] ? msg : null
