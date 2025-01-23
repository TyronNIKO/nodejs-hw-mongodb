import { Router } from 'express';
import contactsRouter from './contacts.js';
import unitsRouter from './units.js';
import authRouter from './auth.js';
import usersRouter from './users.js';
import { swaggerDocs } from '../middlewares/swaggerDocs.js';

const router = Router();

router.use('/contacts', contactsRouter);
router.use('/units', unitsRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/api-docs', swaggerDocs());

export default router;
