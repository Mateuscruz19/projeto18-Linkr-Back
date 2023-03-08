import { Router } from 'express';
import { postPublication } from '../controllers/publicationController.js';
import validateSchema from '../middlewares/validateSchemas.middleware.js';
import { publicationSchema } from '../models/puclicationSchema.js';
import { getPublication } from '../controllers/publicationController.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/publication', validateSchema(publicationSchema), authenticate, postPublication);
router.get('/publication', authenticate, getPublication);

export default router;
