import { Router } from 'express';
import { getAllUsersController } from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get(
    '/',
    // checkRoles(ROLES.ADMIN),
    ctrlWrapper(getAllUsersController),
);

export default router;
