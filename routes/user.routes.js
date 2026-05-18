import {Router} from 'express';
import { getUsers, getUserById } from '../controllers/user.controller.js';
import Authorize from '../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', Authorize,getUserById);


userRouter.post('/', (req, res) => {
    // Logic for creating a new user
    res.send({ message: 'create user' });
});

userRouter.put('/:id', (req, res) => {
    // Logic for updating a user by ID
    res.send({ message: `update user with id ${req.params.id}` });
});

userRouter.delete('/:id', (req, res) => {
    // Logic for deleting a user by ID
    res.send({ message: `delete user with id ${req.params.id}` });
});

export default userRouter;