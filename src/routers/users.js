import { Router } from 'express';
import {
    getAllUsersController,
    getCurrentUserDataController,
    patchCurrentUserDataController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';

const users = Router();

users.use(authenticate);

users.get(
    '/',
    // checkRoles(ROLES.ADMIN),
    ctrlWrapper(getAllUsersController),
);

users.get('/current', ctrlWrapper(getCurrentUserDataController));

users.patch(
    '/current',
    // upload.single('photo'),
    // validateBody(update),
    ctrlWrapper(patchCurrentUserDataController),
);

export default users;
