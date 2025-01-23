import createHttpError from 'http-errors';

import {
    getAllUnits,
    getUnitById,
    createUnit,
    deleteUnit,
    updateUnit,
} from '../db/services/units.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getUnitsController = async (req, res, next) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const units = await getAllUnits({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
        userId: req.user._id,
    });
    res.json({
        status: 200,
        message: 'Successfully found units!',
        data: units,
    });
};

export const getUnitByIdController = async (req, res, next) => {
    const { unitId } = req.params;
    const { _id } = req.user;
    const unit = await getUnitById({ unitId, userId: _id });

    if (!unit) {
        throw createHttpError(404, 'Unit with this ID not found');
    }

    res.json({
        status: 200,
        message: `Successfully found unit with id ${unitId}!`,
        data: unit,
    });
};

export const createUnitController = async (req, res) => {
    console.log('createUnitController: ', req);

    const userId = req.user._id;
    const photo = req.file;
    let photoUrl;
    if (photo) {
        if (env('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }
    const data = { ...req.body, userId, photo: photoUrl };

    const unit = await createUnit(data);

    res.status(201).json({
        status: 201,
        message: `Successfully created a unit!`,
        data: unit,
    });
};

export const deleteUnitController = async (req, res) => {
    const { unitId } = req.params;
    const userId = req.user._id;
    const data = { unitId, userId };
    const unit = await deleteUnit(data);
    if (!unit) {
        throw createHttpError(404, 'Unit not found');
    }

    res.sendStatus(204);
};

export const upsertUnitController = async (req, res) => {
    const { unitId } = req.params;
    const userId = req.user._id;
    const photo = req.file;
    let photoUrl;
    if (photo) {
        if (env('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }
    const result = await updateUnit(
        { unitId, userId },
        { ...req.body, photo: photoUrl },
        {
            upsert: true,
        },
    );

    if (!result) {
        throw createHttpError(404, 'Unit not found');
    }

    const status = result.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: `Successfully upserted a unit!`,
        data: result.unit,
    });
};

export const patchUnitController = async (req, res) => {
    const { unitId } = req.params;
    const userId = req.user._id;
    const photo = req.file;
    let photoUrl;
    if (photo) {
        if (env('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }

    const result = await updateUnit(
        { unitId, userId },
        { ...req.body, photo: photoUrl },
    );

    if (!result) {
        throw createHttpError(404, 'Unit not found');
    }

    res.json({
        status: 200,
        message: `Successfully patched a unit!`,
        data: result.unit,
    });
};
