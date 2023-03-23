import { Router } from 'express';
import {
  deletePublication,
  postPublication,
  updateDescriptionPublication,
  getUserLikePublication,
  sendLikeInPost,
  deleteLikePublication,
  createComment,
} from '../controllers/publicationController.js';
import validateSchema from '../middlewares/validateSchemas.middleware.js';
import { publicationSchema, updatePostSchema } from '../models/puclicationSchema.js';
import { getPublication } from '../controllers/publicationController.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  validateIdAndLimit,
  validatePostId,
  verifyPostIsUser,
} from '../middlewares/publication.middleware.js';
import commentSchema from '../models/commentSchema.js';

const router = Router();

router.get('/publication', authenticate, getPublication);
router.get('/publication/:postId/likes', authenticate, validateIdAndLimit, getUserLikePublication);
router.post('/publication/:postId/likes', authenticate, validatePostId, sendLikeInPost);
router.post('/publication/:postId/comments', authenticate, validateSchema(commentSchema), createComment);
router.post('/publication', validateSchema(publicationSchema), authenticate, postPublication);
router.put(
  '/publication/:id',
  validateSchema(updatePostSchema),
  authenticate,
  verifyPostIsUser,
  updateDescriptionPublication
);
router.delete('/publication/:id', authenticate, verifyPostIsUser, deletePublication);
router.delete('/publication/:postId/likes', authenticate, validatePostId, deleteLikePublication);

export default router;
