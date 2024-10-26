import { calculatePaginationData } from '../../utils/calculatePaginationData.js';
import { ContactsCollection } from '../models/contacts.js';
import { SORT_ORDER } from '../../constants/index.js';

export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortBy = SORT_ORDER.ASC,
    sortOrder = '_id',
    filter = {},
    userId,
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find();

    contactsQuery.where('userId').equals(userId);

    if (filter.isFavourite) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }
    const [contactsCount, contacts] = await Promise.all([
        ContactsCollection.find().merge(contactsQuery).countDocuments(),
        contactsQuery
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec(),
    ]);
    const paginationData = calculatePaginationData(
        contactsCount,
        perPage,
        page,
    );
    return {
        data: contacts,
        ...paginationData,
    };
};
export const getContactById = async ({ contactId, userId }) => {
    const contact = await ContactsCollection.findById({
        _id: contactId,
        userId,
    });
    return contact;
};
export const createContact = async (payload) => {
    // Тіло функції
    const contact = await ContactsCollection.create(payload);
    return contact;
};
export const deleteContact = async ({ contactId, userId }) => {
    // Тіло функції
    const contact = await ContactsCollection.findOneAndDelete({
        _id: contactId,
        userId,
    });
    return contact;
};
export const updateContact = async (contactId, payload, options = {}) => {
    // Тіло функції
    const rawResult = await ContactsCollection.findOneAndUpdate(
        { _id: contactId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};
