import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
    loginUserController,
    logoutUserController,
    refreshUserSessionController,
    registerUserController,
    requestResetEmailController,
    resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
    loginUserSchema,
    registerUserSchema,
    requestResetEmailSchema,
    resetPasswordSchema,
} from '../validation/auth.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';
import { getAllUsersController } from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';
import { send } from 'process';
import path from 'node:path';
import express from 'express';

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

router.post(
    '/send-reset-email',
    validateBody(requestResetEmailSchema),
    ctrlWrapper(requestResetEmailController),
);
router.use(express.static(path.join(process.cwd(), 'public')));
router.get(
    '/reset-pwd',
    // validateBody(resetPasswordSchema),
    // ctrlWrapper(resetPasswordController),
    (req, res) =>
        res.sendFile(
            path.join(process.cwd(), 'public', 'reset-pass-form.html'),
        ),
);
router.post(
    '/reset-pwd',
    validateBody(resetPasswordSchema),
    ctrlWrapper(resetPasswordController),
);
export default router;
