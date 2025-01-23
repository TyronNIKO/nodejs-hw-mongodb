import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
    getUnitsController,
    getUnitByIdController,
    createUnitController,
    deleteUnitController,
    upsertUnitController,
    patchUnitController,
} from '../controllers/units.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
    createUnitSchema,
    patchUnitSchema,
    upsertUnitSchema,
} from '../validation/units.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ROLES } from '../constants/index.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { upload } from '../middlewares/multer.js';

const units = Router();

units.use(authenticate);

// units.get('/', checkRoles(ROLES.ADMIN), ctrlWrapper(getUnitsController));
units.get('/', ctrlWrapper(getUnitsController));
units.post(
    '/',
    // checkRoles(ROLES.ADMIN),
    upload.single('photo'),
    validateBody(createUnitSchema),
    ctrlWrapper(createUnitController),
);
units.get(
    '/:unitId',
    // checkRoles(ROLES.ADMIN, ROLES.USER),
    isValidId,
    ctrlWrapper(getUnitByIdController),
);
units.delete(
    '/:unitId',
    // checkRoles(ROLES.ADMIN),
    isValidId,
    ctrlWrapper(deleteUnitController),
);
units.put(
    '/:unitId',
    // checkRoles(ROLES.ADMIN),
    upload.single('photo'),
    validateBody(upsertUnitSchema),
    ctrlWrapper(upsertUnitController),
);
units.patch(
    '/:unitId',
    // checkRoles(ROLES.ADMIN, ROLES.USER),
    isValidId,
    upload.single('photo'),
    validateBody(patchUnitSchema),
    ctrlWrapper(patchUnitController),
);

export default units;
