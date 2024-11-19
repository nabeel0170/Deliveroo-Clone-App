import * as Yup from 'yup';

export const emailValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email format is invalid',
    )
    .required('Email is required'),
});

export const signUpValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email format is invalid',
    )
    .required('Email is required'),
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Full name is required'),
  contactNumber: Yup.string()
    .matches(/^\d{10,12}$/, 'Contact number must be 12 digits')
    .required('Contact number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
      'Password must contain at least one letter and one number',
    )
    .required('New password is required'),
  repeatedPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email format is invalid',
    )
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Password must be at least 3 characters')

    .required('Password is required'),
});
