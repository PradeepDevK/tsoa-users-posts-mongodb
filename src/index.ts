import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/swagger.json";

const app = express();
app.use(bodyParser.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/tsoa_example';
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(`MongoDB connection error: ${err}`));

// Register TSOA routes
RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:3000`);
    console.log(`Swagger docs running on http://localhost:3000/docs`);
})