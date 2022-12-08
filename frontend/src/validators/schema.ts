import * as Yup from 'yup';
import { validateInputEmail, validatePassword } from '../utils/validatesInputs';

export const SignUpschema  = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required').test('Email', 'accents not allowed', value => validateInputEmail(value)),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required').test('one-uppercase character special character and a number', 'Password must contain at least one uppercase letter, one special character and one number', value => validatePassword(value)),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export const Loginschema  = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required').test('Email', 'accents not allowed', value => validateInputEmail(value)),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
})
