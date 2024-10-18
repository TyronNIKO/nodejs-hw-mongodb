// const express = require('express');
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { env } from './utils/env.js';

// import contactsRouter from './routers/contacts.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import path from 'node:path';

const app = express();

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );
    app.use(cors());
    app.use(cookieParser());

    app.use((req, res, next) => {
        console.log(`Time: ${new Date().toLocaleString()}`);
        // throw new Error('Error on home page');
        next();
    });

    app.use(express.json());
    //   app.use(express.static(path.join(process.cwd(), 'public')));
    app.get('/', (req, res) => {
        res.json({
            message: 'Hello world!',
        });
        // res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
    });

    app.use(router);

    app.use('*', notFoundHandler);
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
