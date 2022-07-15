import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const registerValidator = (params: any) => {
  const { name, email, password } = params;
  return registerSchema.validate({ name, email, password });
};

export default registerValidator;
