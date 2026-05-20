import {Router} from 'express';
import Authorize from '../middleware/auth.middleware.js';
import { createSubscription } from '../controllers/subscription.controller.js';
import { getUserSubscriptions } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    // Logic for fetching subscriptions
    res.send({ message: 'get all subscriptions' });
});

subscriptionRouter.get("/:id", (req, res) => {
    res.send({ message: `get subscription with id ${req.params.id}` });
});

subscriptionRouter.post('/', Authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
    res.send({ message: `update subscription with id ${req.params.id}` });
});

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({ message: `delete subscription with id ${req.params.id}` });
});

subscriptionRouter.get('/user/:id', Authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({ message: `cancel subscription with id ${req.params.id}` });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({ message: 'get subscriptions with upcoming renewals' });
});

export default subscriptionRouter;