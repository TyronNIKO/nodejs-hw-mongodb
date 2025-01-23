import { UsersCollection } from '../models/user.js';

export const getAllUsers = async () => {
    const usersQuery = UsersCollection.find();
    return usersQuery;
};
export const patchCurrentUserData = (_id, payload = {}) => {
    return UsersCollection.findOneAndUpdate(
        {
            _id,
        },
        payload,
        { new: true },
    );
};
