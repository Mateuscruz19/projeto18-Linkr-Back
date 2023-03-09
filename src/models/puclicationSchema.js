import joi from 'joi';

export const publicationSchema = joi.object({
  link: joi
    .string()
    .regex(
      /^(http|https):\/\/[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    )
    .required(),
  description: joi.string().required(),
  name: joi.string().required(),
});

export const updatePostSchema = joi.object({
  description: joi.string().required(),
});
