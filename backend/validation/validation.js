const Joi = require('@hapi/joi');


const registrationValidation = data => {

    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
      });
      return schema.validate(schema, data);
      //schema.validate (data, schema);
};

const loginValidation = data => {

    const schema = {
        email: Joi.string()
        .min(10)
        .email()
        .required(),
        password: Joi.string()
        .min(6)
        .required(),
      };
      return schema.validate (data, schema);
};

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;