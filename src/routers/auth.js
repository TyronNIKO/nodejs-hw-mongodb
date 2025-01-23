import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
    getGoogleOAuthUrlController,
    loginUserController,
    loginWithGoogleController,
    logoutUserController,
    refreshUserSessionController,
    registerUserController,
    requestResetEmailController,
    resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
    loginUserSchema,
    loginWithGoogleOAuthSchema,
    registerUserSchema,
    requestResetEmailSchema,
    resetPasswordSchema,
} from '../validation/auth.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';
import { getAllUsersController } from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';

import path from 'node:path';
import express from 'express';

const auth = Router();
auth.post(
    '/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);
auth.post(
    '/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);
auth.post('/logout', ctrlWrapper(logoutUserController));
auth.post('/refresh', ctrlWrapper(refreshUserSessionController));

auth.post(
    '/send-reset-email',
    validateBody(requestResetEmailSchema),
    ctrlWrapper(requestResetEmailController),
);
auth.use(express.static(path.join(process.cwd(), 'public')));
auth.get(
    '/reset-pwd',
    // validateBody(resetPasswordSchema),
    // ctrlWrapper(resetPasswordController),
    (req, res) =>
        res.sendFile(
            path.join(process.cwd(), 'public', 'reset-pass-form.html'),
        ),
);
auth.post(
    '/reset-pwd',
    validateBody(resetPasswordSchema),
    ctrlWrapper(resetPasswordController),
);
auth.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));
auth.post(
    '/confirm-oauth',
    validateBody(loginWithGoogleOAuthSchema),
    ctrlWrapper(loginWithGoogleController),
);
export default auth;
