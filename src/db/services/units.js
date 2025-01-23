import { calculatePaginationData } from '../../utils/calculatePaginationData.js';
import { UnitsCollection } from '../models/units.js';
import { SORT_ORDER } from '../../constants/index.js';

export const getAllUnits = async ({
    page = 1,
    perPage = 10,
    sortBy = SORT_ORDER.ASC,
    sortOrder = '_id',
    filter = {},
    userId,
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const unitsQuery = UnitsCollection.find();

    unitsQuery.where('userId').equals(userId);

    if (filter.isFavourite) {
        unitsQuery.where('isFavourite').equals(filter.isFavourite);
    }
    const [unitsCount, units] = await Promise.all([
        UnitsCollection.find().merge(unitsQuery).countDocuments(),
        unitsQuery
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec(),
    ]);
    const paginationData = calculatePaginationData(unitsCount, perPage, page);
    let message = '';
    if (units.length === 0) {
        message = 'No listed units';
    }
    return {
        data: units,
        ...paginationData,
        message: message,
    };
};
export const getUnitById = async ({ unitId, userId }) => {
    const unit = await UnitsCollection.findById({
        _id: unitId,
        userId,
    });
    return unit;
};
export const createUnit = async (payload) => {
    // Тіло функції
    const unit = await UnitsCollection.create(payload);
    return unit;
};
export const deleteUnit = async ({ unitId, userId }) => {
    // Тіло функції
    const unit = await UnitsCollection.findOneAndDelete({
        _id: unitId,
        userId,
    });
    return unit;
};
export const updateUnit = async (data, payload, options = {}) => {
    // Тіло функції
    const rawResult = await UnitsCollection.findOneAndUpdate(
        { _id: data.unitId, userId: data.userId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
        unit: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};
