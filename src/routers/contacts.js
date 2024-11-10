import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
    getContactsController,
    getContactByIdController,
    createContactController,
    deleteContactController,
    upsertContactController,
    patchContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
    createContactSchema,
    patchContactSchema,
    upsertContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ROLES } from '../constants/index.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

// router.get('/', checkRoles(ROLES.ADMIN), ctrlWrapper(getContactsController));
router.get('/', ctrlWrapper(getContactsController));
router.post(
    '/',
    // checkRoles(ROLES.ADMIN),
    upload.single('photo'),
    validateBody(createContactSchema),
    ctrlWrapper(createContactController),
);
router.get(
    '/:contactId',
    // checkRoles(ROLES.ADMIN, ROLES.USER),
    isValidId,
    ctrlWrapper(getContactByIdController),
);
router.delete(
    '/:contactId',
    // checkRoles(ROLES.ADMIN),
    isValidId,
    ctrlWrapper(deleteContactController),
);
router.put(
    '/:contactId',
    // checkRoles(ROLES.ADMIN),
    upload.single('photo'),
    validateBody(upsertContactSchema),
    ctrlWrapper(upsertContactController),
);
router.patch(
    '/:contactId',
    // checkRoles(ROLES.ADMIN, ROLES.USER),
    isValidId,
    upload.single('photo'),
    validateBody(patchContactSchema),
    ctrlWrapper(patchContactController),
);

export default router;
