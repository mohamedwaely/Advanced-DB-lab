import express, { Application } from 'express';
import { connectDB } from './db';
import memberRoutes from './routes/members';
import bookRoutes from './routes/books';
import borrowingRoutes from './routes/borrowings';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/v1/members', memberRoutes);
app.use('/v1/books', bookRoutes);
app.use('/v1/borrowings', borrowingRoutes);

const makeServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

makeServer();

