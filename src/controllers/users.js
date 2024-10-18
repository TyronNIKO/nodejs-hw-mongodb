import { getAllUsers } from '../db/services/users.js';

export const getAllUsersController = async (req, res) => {
    const users = await getAllUsers();
    res.status(200).json({
        status: 200,
        message: 'Successfully found users!',
        data: users,
    });
};
