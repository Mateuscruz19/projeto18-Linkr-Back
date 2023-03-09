import joi from 'joi';

export const publicationSchema = joi.object({
  link: joi.string().uri().required(),
  description: joi.string().required()
});

export const updatePostSchema = joi.object({
  description: joi.string().required(),
});
