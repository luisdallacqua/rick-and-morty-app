import * as yup from 'yup'

export const userSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  email: yup.string().required('o email é obrigatório'),
  password: yup
    .string()
    .required('A senha tem que ter ao menos 6 caracteres')
    .min(6, 'A senha tem que ter ao menos 6 caracteres'),
  cpf: yup
    .string()
    .required('é obrigatório fornecer o cpf')
    .min(4, 'Tem que haver 11 digítios'),
  birthDate: yup.string().required('Data de nascimento é um campo obrigatórios')
})

export const loginSchema = yup.object().shape({
  email: yup.string().required('o email é obrigatório'),
  password: yup
    .string()
    .required('A senha tem que ter ao menos 6 caracteres')
    .min(6, 'A senha tem que ter ao menos 6 caracteres')
})
