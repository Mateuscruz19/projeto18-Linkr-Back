import { Router } from 'express';
import {
  deletePublication,
  postPublication,
  updateDescriptionPublication,
  getUserLikePublication,
  sendLikeInPost,
  deleteLikePublication,
  createComment,
  getCommentsByPostId,
  getPublication,
  getPuclicationPage
} from '../controllers/publicationController.js';
import validateSchema from '../middlewares/validateSchemas.middleware.js';
import { publicationSchema, updatePostSchema } from '../models/puclicationSchema.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  validateIdAndLimit,
  validatePostId,
  verifyPostIsUser,
} from '../middlewares/publication.middleware.js';
import commentSchema from '../models/commentSchema.js';

const router = Router();

router.get('/publication', authenticate, getPublication);
router.get('publication/page/:page', authenticate, getPuclicationPage);
router.get('/publication/:postId/likes', authenticate, validateIdAndLimit, getUserLikePublication);
router.post('/publication/:postId/likes', authenticate, validatePostId, sendLikeInPost);
router.get('/publication/:postId/comments', authenticate, getCommentsByPostId);
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
