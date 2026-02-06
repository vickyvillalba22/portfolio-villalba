// utils/validation/schemas.ts
import { required, minLength, isEmail, matchField, noFutureDate } from './rules'
import type { Schema } from './validate'

/* ---------- USER ---------- */

//Sí, uso any acá a propósito. Porque los forms no son exactamente User ni Project, son drafts. Esto es buena práctica en forms.

export const userAddSchema: Schema<any> = {
  name: [required()],
  email: [required(), isEmail],
  password: [required(), minLength(6)],
  repeatPassword: [required(), matchField('password')],
  registerDate: [required(), noFutureDate]
}

export const userEditSchema: Schema<any> = {
  name: [required()],
  email: [required(), isEmail],
  registerDate: [required(), noFutureDate]
}

/* ---------- PROJECT ---------- */

export const projectStep1Schema: Schema<any> = {
  titulo: [required()],
  categoria: [required()],
  descripcionCorta: [required(), minLength(10)],
  year: [required()],
  materia: [required()]
}

export const projectStep2Schema: Schema<any> = {
  descripcionLarga: [required(), minLength(30)]
}
