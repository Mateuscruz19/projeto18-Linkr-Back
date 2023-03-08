import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Auth from './routes/auth.route.js';
import publicationRoutes from './routes/publicationRoutes.js';
import { usersRouter } from './routes/users.route.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(Auth);
app.use(publicationRoutes);
app.use('/users', usersRouter);

const port = process.env.PORT || '4000';
app.listen(port, () => console.log(`Server running in port: ${port}`));
