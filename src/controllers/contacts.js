import createHttpError from 'http-errors';

import {
    getAllContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContact,
} from '../db/services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getContactsController = async (req, res, next) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
        userId: req.user._id,
    });
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id } = req.user;
    const contact = await getContactById({ contactId, userId: _id });

    if (!contact) {
        throw createHttpError(404, 'Contact with this ID not found');
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};

export const createContactController = async (req, res) => {
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

    const contact = await createContact(data);

    res.status(201).json({
        status: 201,
        message: `Successfully created a contact!`,
        data: contact,
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    const data = { contactId, userId };
    const contact = await deleteContact(data);
    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.sendStatus(204);
};

export const upsertContactController = async (req, res) => {
    const { contactId } = req.params;
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
    const result = await updateContact(
        { contactId, userId },
        { ...req.body, photo: photoUrl },
        {
            upsert: true,
        },
    );

    if (!result) {
        throw createHttpError(404, 'Contact not found');
    }

    const status = result.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: `Successfully upserted a contact!`,
        data: result.contact,
    });
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
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

    const result = await updateContact(
        { contactId, userId },
        { ...req.body, photo: photoUrl },
    );

    if (!result) {
        throw createHttpError(404, 'Contact not found');
    }

    res.json({
        status: 200,
        message: `Successfully patched a contact!`,
        data: result.contact,
    });
};
