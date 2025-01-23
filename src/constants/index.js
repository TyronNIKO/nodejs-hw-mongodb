import path from 'node:path';

export const HTTP_STATUSES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
};

export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc',
};
export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;
export const THIRTY_DAYS = 30 * ONE_DAY;

export const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
};

export const SMTP = {
    SMTP_HOST: 'SMTP_HOST',
    SMTP_PORT: 'SMTP_PORT',
    SMTP_USER: 'SMTP_USER',
    SMTP_PASSWORD: 'SMTP_PASSWORD',
    SMTP_FROM: 'SMTP_FROM',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY = {
    ENABLE_CLOUDINARY: 'ENABLE_CLOUDINARY',
    CLOUD_NAME: 'CLOUD_NAME',
    API_KEY: 'API_KEY',
    API_SECRET: 'API_SECRET',
};
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
