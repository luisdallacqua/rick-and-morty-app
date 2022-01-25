import * as yup from 'yup'

export const userSchema = yup.object().shape({
  name: yup.string().required('The name is required'),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('The password is required')
    .min(6, 'The password needs to be at least 6 characters long')
})

export const userUpdateSchema = yup.object().shape({
  name: yup.string().required('The name is required'),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required')
})

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('The password is required')
    .min(6, 'The password needs to be at least 6 characters long')
})
