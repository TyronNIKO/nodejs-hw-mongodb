import { UsersCollection } from '../models/user.js';

export const getAllUsers = async () => {
    const usersQuery = UsersCollection.find();
    return usersQuery;
};
