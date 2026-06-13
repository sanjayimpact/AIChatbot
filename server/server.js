import app from './src/app.js'
import { connectDb } from './src/config/db.js';
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
});

const Port = process.env.PORT || 3001
const startServer = async () => {
    try {
        await connectDb();

        app.listen(Port, () => {
            console.log(`Server running on port ${Port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();