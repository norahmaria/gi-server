import Errors from '../../types/Errors'

const validateSignIn = (username: string, password: string) => {
  const errors: Errors = {}

  if (username.trim() === '') 
    errors.username = 'Username must not be empty'
  if (password === '') 
    errors.password = 'Password must not be empty'

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

export default validateSignIn