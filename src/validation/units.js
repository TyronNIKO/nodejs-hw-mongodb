import Joi from 'joi';

export const createUnitSchema = Joi.object({
    PIB: Joi.string().min(3).max(30).messages({
        'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
        'any.required': 'Username is required',
    }),
    phone: Joi.string(),
    subdivision: Joi.string(),
    isFavourite: Joi.boolean().valid(true, false),
    unitType: Joi.string().valid('work', 'home', 'personal'),
    callsign: Joi.string(),
    sex: Joi.string().valid('male', 'female'),
    IPN: Joi.string(),
    email: Joi.string().email(),
    position: Joi.string(),
    subdivision: Joi.string(),
    VOS: Joi.string(),
    t_r: Joi.string(),
    SHPK: Joi.string(),
    MU_name: Joi.string(),
    birth_date: Joi.string(),
    place: Joi.string(),
    education: Joi.string(),
    rank: Joi.string(),
    reserve: Joi.string(),
    rank_order_date: Joi.string(),
    rank_order_number: Joi.string(),
    contract_end_date: Joi.string(),
    order_position: Joi.string(),
    service_period: Joi.string(),
    UBD: Joi.string(),
    passport_ua: Joi.string(),
    military_document: Joi.string().valid('military card'),
    type_of_military_service: Joi.string().valid('under contract'),
    date_of_mobilization: Joi.string(),
    military_commissariat: Joi.string(),
    marital_status: Joi.string().valid('married', 'single'),
    family: {
        wife: Joi.string(),
        children: Joi.string(),
        mother: Joi.string(),
        father: Joi.string(),
    },
    size_grid: Joi.string(),
    blood_type: Joi.string(),
    address_of_registration: Joi.string(),
    address_of_actual_residence: Joi.string(),
    presence_of_relatives_in_the_occupied_territory: Joi.string(),
    participation_in_ATO_JFO: Joi.string(),
    internally_displaced_person: Joi.string(),
    group_of_disability: Joi.string(),
    total_years_of_service: Joi.string(),
    parrenting: Joi.string().valid('father', 'mother', 'single'),
    status: Joi.string(),
    // userId: Joi.string().required(), // нова властивість
});

export const upsertUnitSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
        'any.required': 'Username is required',
    }),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email(),
    isFavourite: Joi.boolean().valid(true, false),
    unitType: Joi.string().valid('work', 'home', 'personal').required(),
});

export const patchUnitSchema = Joi.object({
    name: Joi.string().min(3).max(30).messages({
        'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
    }),
    phoneNumber: Joi.string(),
    email: Joi.string().email(),
    isFavourite: Joi.boolean().valid(true, false),
    unitType: Joi.string().valid('work', 'home', 'personal'),
});
