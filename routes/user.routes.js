import {Router} from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
    // Logic for fetching users
    res.send({ message: 'get all users' });
});

userRouter.get('/:id', (req, res) => {
    // Logic for fetching a specific user by ID
    res.send({ message: `get user with id ${req.params.id}` });
});

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