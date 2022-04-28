const joi = require('joi');

const loginSchema = joi
  .object({
    email: joi.string().email().message('Invalid Email'),
    password: joi
      .string()
      .min(8)
      .max(30)
      .message('Password did not match the required pattern.')
  })
  .options({ presence: 'required' })
  .required();

const signUpSchema = loginSchema
  .keys({
    firstName: joi.string(),
    lastName: joi.string()
  })
  .options({ presence: 'required' })
  .required();

module.exports = {
  loginSchema,
  signUpSchema
};
