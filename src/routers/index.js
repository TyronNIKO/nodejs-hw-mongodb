import { Router } from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';
import usersRouter from './users.js';

const router = Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);

export default router;
