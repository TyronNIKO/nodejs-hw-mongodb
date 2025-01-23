import { HTTP_STATUSES } from '../constants/index.js';
import { getAllUsers, patchCurrentUserData } from '../db/services/users.js';
const { OK, NOT_FOUND } = HTTP_STATUSES;

export const getAllUsersController = async (req, res) => {
    const users = await getAllUsers();
    res.status(200).json({
        status: 200,
        message: 'Successfully found users!',
        data: users,
    });
};

export const getCurrentUserDataController = async (req, res) => {
    const currentUser = req.user;
    res.json({
        status: OK,
        message: `Successfully found user with id ${req.user._id}!`,
        data: currentUser,
    });
};

export const patchCurrentUserDataController = async (req, res) => {
    const photo = req.file;
    let photoUrl;

    if (photo) {
        photoUrl = await saveFileToCloudinary(photo);
    }

    const currentUser = await patchCurrentUserData(req.user._id, {
        ...req.body,
        photo: photoUrl,
    });

    if (!currentUser) {
        throw createHttpError(NOT_FOUND, 'User not found');
    }

    res.json({
        status: OK,
        message: `Successfully patched user with id ${req.user._id}!`,
        data: currentUser,
    });
};
