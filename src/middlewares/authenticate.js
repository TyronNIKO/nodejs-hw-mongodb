import createHttpError from 'http-errors';

import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';
import { HTTP_STATUSES } from '../constants/index.js';

const { UNAUTHORIZED } = HTTP_STATUSES;

export const authenticate = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    // console.log('AUTHENTICATE 11 authHeader: ', authHeader);

    if (!authHeader) {
        next(
            createHttpError(
                UNAUTHORIZED,
                'Please provide Authorization header',
            ),
        );
        return;
    }

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
        next(
            createHttpError(
                UNAUTHORIZED,
                'Auth header should be of type Bearer',
            ),
        );
        return;
    }
    // console.log('AUTHENTICATE 34 token: ', token);

    const session = await SessionsCollection.findOne({ accessToken: token });

    if (!session) {
        next(createHttpError(UNAUTHORIZED, 'authenticate Session not found'));
        return;
    }

    const isAccessTokenExpired =
        new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
        next(createHttpError(UNAUTHORIZED, 'Access token expired'));
    }

    const user = await UsersCollection.findById({ _id: session.userId });

    if (!user) {
        next(createHttpError(UNAUTHORIZED));
        return;
    }

    req.user = user;
    next();
};
