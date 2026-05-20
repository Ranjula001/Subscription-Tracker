import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Subscription name is required'],
        trim : true,
        minlength : [3, 'Subscription name must be at least 3 characters long'],
        maxlength : [50, 'Subscription name must be at most 50 characters long'],
    },
    price : {
        type : Number,
        required : [true, 'Subscription price is required'],
        min : [0, 'Subscription price must be a positive number'],
        max : [10000, 'Subscription price must be less than 10000'],
    },
    currency : {
        type : String,
        enum : ['LKR', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD'],
        required : [true, 'Currency is required'],
        default : 'LKR',
    },
    frequency : {
        type : String,
        enum : ['daily', 'weekly', 'monthly', 'yearly'],
        required : [true, 'Subscription frequency is required'],
        default : 'monthly',
    },
    category : {
        type : String,
        enum : ['entertainment', 'utilities', 'software', 'education', 'health', 'other'],
        required : [true, 'Subscription category is required'],
    },
    paymentMethod : {
        type : String,
        required : [true, 'Payment method is required'],
        trim : true,
    },
    status : {
        type : String,
        enum : ['active', 'canceled', 'expired'],
        default : 'active',
    },
    startDate : {
        type : Date,
        required : [true, 'Subscription start date is required'],
        validate : {
            validator : function(value) {
                return value <= new Date();
            },
            message : 'Start date must be today or a past date',
        },
    },
    renewalDate : {
        type : Date,
        validate : {
            validator : function(value) {
                return value > this.startDate;
            },
            message : 'Renewal date must be after the start date',
        },

    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
        index : true,
    }
}, { timestamps : true });


//Auto-calculate renewal date if missing
subscriptionSchema.pre('save', async function() {

    if (!this.renewalDate) {

        const renewalPeriods = {
            daily : 1,
            weekly : 7,
            monthly : 30,
            yearly : 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);

    }

    //Auto update status if renewal date has passed
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;