import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todo.routes';
import sequelize from './config/database';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/todos', todoRoutes);

sequelize.sync()
    .then(() => {
        console.log('Database synced');
        app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
    })
    .catch((e: Error) => {
        console.error("Error:", e.message);
    });

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err.message);
    res.status(500).send('Something broke!');
});

process.on('unhandledRejection', (err: unknown) => {
    if (err instanceof Error) {
        console.error(err.name, err.message);
    }
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
});

process.on('uncaughtException', (err: Error) => {
    console.error(err.name, err.message);
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
});
