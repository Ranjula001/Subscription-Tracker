import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from './config/config.js';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';
import workflowRouter from './routes/workflow.routes.js';

import errorMiddleware from './middleware/error.middleware.js';
import arcjetMiddleware from './middleware/arcjet.middleware.js';

import connectDB from './database/mongodb.js';

const app = express();

app.use(express.json()); //allows handle json data sent in request or API calls
app.use(express.urlencoded({ extended: false })); //helps to process the form data sent by a html form in a simple format
app.use(cookieParser()); //allows to handle save user data in cookies and manage user sessions
app.use(arcjetMiddleware); //apply Arcjet middleware to all routes

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);
app.use('/api/v1/workflows', workflowRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to the subscription tracker API!');
});

app.listen(PORT, async ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);

    await connectDB();
});

export default app;