import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import userMiddleware from '../middlewares/user.middleware.js';

const router = Router('/users');

router.get('/', authenticate, userController.showByUsername);
router.get('/current', authenticate, userController.getCurrentUserById);
router.get('/:userId/publication', authenticate, userController.getPublicationByUserId);
router.get(
  '/follow/:followUserId',
  authenticate,
  userMiddleware.verifyFollowUserIdExist,
  userMiddleware.checkIfTheUserHasBeenFollowed,
  userController.verifyFollowUser
);
router.post(
  '/follow/:followUserId',
  authenticate,
  userMiddleware.verifyFollowUserIdExist,
  userMiddleware.checkIfTheUserHasBeenFollowed,
  userController.postFollowUser
);
router.delete(
  '/follow/:followUserId',
  authenticate,
  userMiddleware.verifyFollowUserIdExist,
  userMiddleware.checkIfTheUserHasBeenFollowed,
  userController.deleteFollowUser
);

export { router as usersRouter };
