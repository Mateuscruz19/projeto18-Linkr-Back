import joi from "joi";

export const userSchema = joi.object({
    email: joi.string().email().required().min(3),
    password: joi.string().required().min(3),
    username: joi.string().required().min(3),
    picture:joi.string().uri().required()
});

