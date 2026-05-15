import {Router} from 'express';

const authRouter = Router();

authRouter.post('/signup', (req, res) => {
    // Logic for user signup
    res.send({ message: 'sign-up' });
});

authRouter.post('/signin', (req, res) => {
    // Logic for user signin
    res.send({ message: 'sign-in' });
});

authRouter.post('/signout', (req, res) => {
    // Logic for user signout
    res.send({ message: 'sign-out' });
});

export default authRouter;