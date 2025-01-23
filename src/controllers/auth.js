import { HTTP_STATUSES, ONE_DAY } from '../constants/index.js';
import {
    loginOrSignupWithGoogle,
    loginUser,
    logoutUser,
    refreshUserSession,
    registerUser,
    requestResetToken,
    resetPassword,
} from '../db/services/auth.js';
import { clearCookies } from '../utils/clearCookies.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';
import { setupCookies } from '../utils/setupCookies.js';
const { CREATED, OK, NO_CONTENT } = HTTP_STATUSES;

export const registerUserController = async (req, res) => {
    const user = await registerUser(req.body);

    res.status(CREATED).json({
        status: CREATED,
        message: 'Successfully registered a user!',
        data: user,
    });
};
export const loginUserController = async (req, res) => {
    const { session, user } = await loginUser(req.body);
    console.log(session, user);

    // далі ми доповнемо цей контролер
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });

    res.json({
        status: OK,
        message: 'Successfully logged in an user!',
        data: {
            user,
            accessToken: session.accessToken,
        },
    });
};

export const logoutUserController = async (req, res) => {
    if (req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    }
    clearCookies(res);
    res.status(NO_CONTENT).send();
};

const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
};

export const refreshUserSessionController = async (req, res) => {
    const { sessionId, refreshToken } = req.cookies;
    // console.log('AUTH 70 req.cookies:', req.cookies);

    const session = await refreshUserSession({ sessionId, refreshToken });

    setupCookies(res, session);

    res.status(OK).json({
        status: OK,
        message: 'Successfully refreshed a session!',
        data: {
            accessToken: session.accessToken,
        },
    });
};

export const requestResetEmailController = async (req, res) => {
    await requestResetToken(req.body.email);
    res.json({
        message: 'Reset password email was successfully sent!',
        status: OK,
        data: {},
    });
};

export const resetPasswordController = async (req, res) => {
    await resetPassword(req.body);
    res.json({
        message: 'Password was successfully reset!',
        status: OK,
        data: {},
    });
};

export const getGoogleOAuthUrlController = async (req, res) => {
    const url = generateAuthUrl();
    res.json({
        status: OK,
        message: 'Successfully get Google OAuth url!',
        data: {
            url,
        },
    });
};
export const loginWithGoogleController = async (req, res) => {
    const session = await loginOrSignupWithGoogle(req.body.code);
    setupSession(res, session);

    res.json({
        status: OK,
        message: 'Successfully logged in via Google OAuth!',
        data: {
            accessToken: session.accessToken,
        },
    });
};
