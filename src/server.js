// const express = require('express');
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './db/services/contacts.js';

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

  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    // throw new Error('Error on home page');
    next();
  });

  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    // res.status(200).json({
    //   data: contacts,
    // });
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
      // дані, отримані в результаті обробки запиту
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    // Відповідь, якщо контакт не знайдено
    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }

    // Відповідь, якщо контакт знайдено
    // res.status(200).json({
    //   data: contact,
    // });
    res.json({
      status: 200,
      message: 'Successfully found contact with id {contactId}!',
      data: contact,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
      //   stack: err.stack,
      name: err.name,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
