import Errors from '../../types/Errors'

const validateSignUp = (username: string, email: string, password: string, confirmPassword: string) => {
  const errors: Errors = {}
  const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/

  if (username.trim() === '') {
    errors.username = 'Username must not be empty'
  } else if (username.length < 2) {
    errors.username = 'Username must be at least two characters'
  } else if (username.match(/\s/g)) {
    errors.username = 'Username can not include spaces'
  }

  if (email.trim() === '') {
    errors.email = 'E-mail must not be empty'
  } else if (!email.match(emailRegex)) {
    errors.email = 'E-mail is not valid'
  }

  if (password === '') {
    errors.password = 'Password must not be empty'
  } else if (password.length < 5) {
    errors.password = 'Password too short'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

export default validateSignUp
