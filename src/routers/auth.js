import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
    loginUserController,
    logoutUserController,
    refreshUserSessionController,
    registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';
import { getAllUsersController } from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.post(
    '/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);
router.post(
    '/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);
router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/refresh', ctrlWrapper(refreshUserSessionController));
export default router;
