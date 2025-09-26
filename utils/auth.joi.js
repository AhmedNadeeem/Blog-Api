const Joi = require("joi");

const userRegisterSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    bio: Joi.string(),
    avatar: Joi.string().required(),
});

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const postCreateSchema = Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().required(),
    cover: Joi.string().required(),
    category: Joi.string().required(),
    tags: Joi.array(),
});

const validation = (schema) => async (payload) => {
    const { error, value } = await schema.validate(payload, { abortEarly: false })
    return {error, value};
};



module.exports = {
    userRegisterValidation: validation(userRegisterSchema),
    userLoginValidation: validation(userLoginSchema),
    postCreateValidation: validation(postCreateSchema),
}