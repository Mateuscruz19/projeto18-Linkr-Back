import Joi from "joi";

export const publicationSchema = Joi.object({
  link: Joi.string().uri().required(),
  description: Joi.string(),
  hashtags: Joi.array().items(Joi.string()),
});

export const updatePostSchema = Joi.object({
  description: Joi.string().required(),
});
