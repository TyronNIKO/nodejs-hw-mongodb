import { model, Schema } from 'mongoose';

const unitsSchema = new Schema(
    {
        email: {
            type: String,
            required: false,
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },

        userId: { type: Schema.Types.ObjectId, ref: 'users' },
        photo: { type: String, default: null },

        PIB: {
            type: String,
            required: true,
        },
        callsign: {
            type: String,
        },
        sex: {
            type: String,
            enum: ['male', 'female'],
            required: true,
        },
        IPN: {
            type: String,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        position: {
            type: String,
        },
        subdivision: {
            type: String,
        },
        VOS: {
            type: String,
        },
        t_r: {
            type: String,
        },
        SHPK: {
            type: String,
        },
        MU_name: {
            type: String,
        },
        birth_date: {
            type: String,
        },
        place: {
            type: String,
        },
        education: {
            type: String,
        },
        rank: {
            type: String,
        },
        reserve: {
            type: String,
        },
        rank_order_date: {
            type: String,
        },
        rank_order_number: {
            type: String,
        },
        contract_end_date: {
            type: String,
        },
        order_position: {
            type: String,
        },
        service_period: {
            type: String,
        },
        UBD: {
            type: String,
        },
        passport_ua: {
            type: String,
        },
        military_document: {
            type: String,
            enum: [
                'military card',
                "officer's card",
                'temporary card',
                'registration certificate',
                'certificate instead of military card',
            ],
        },
        type_of_military_service: {
            type: String,
            enum: ['under contract', 'under mobilization'],
        },
        date_of_mobilization: {
            type: String,
        },
        military_commissariat: {
            type: String,
        },
        marital_status: {
            type: String,
            enum: ['single', 'married', 'divorced', 'widowed'],
        },

        family: {
            wife: String,
            children: String,
            mother: String,
            father: String,
        },
        size_grid: {
            type: String,
        },
        blood_type: {
            type: String,
        },
        address_of_registration: {
            type: String,
        },
        address_of_actual_residence: {
            type: String,
        },
        presence_of_relatives_in_the_occupied_territory: {
            type: String,
        },
        participation_in_ATO_JFO: {
            type: String,
        },
        internally_displaced_person: {
            type: String,
        },
        group_of_disability: {
            type: String,
        },
        total_years_of_service: {
            type: String,
        },
        parrenting: {
            type: String,
            enum: ['father', 'mother', 'single'],
        },
        status: {
            type: String,
            enum: ['ok', 'not_ok'],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
export const UnitsCollection = model('units', unitsSchema);
