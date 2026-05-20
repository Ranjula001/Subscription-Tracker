import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {

        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });
        res.status(201).json({
            success: true,
            message: 'Subscription created successfully',
            data: subscription
        });

    } catch (error) {
        next(error)
    }
};

export const getUserSubscriptions = async (req, res, next) => {

    try {

        //Check if the user is the same as the one in the the token if not throw an error
        if(req.user.id !== req.params.id){
            const error = new Error('Unauthorized access : You can only access your own subscriptions');
            error.status = 401;
            throw error;
        };

        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({
            success: true,
            message: 'Subscriptions retrieved successfully',
            data: subscriptions
        });
        
    } catch (error) {
        next(error)
    }

};