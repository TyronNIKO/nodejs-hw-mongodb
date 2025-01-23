import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';
import { HTTP_STATUSES } from '../constants/index.js';

export const isValidId = (req, res, next) => {
    const { unitId } = req.params;
    if (!isValidObjectId(unitId)) {
        throw createHttpError(
            HTTP_STATUSES.NOT_FOUND,
            `Bad Request! ID ${unitId} not valid.`,
        );
    }

    next();
};
