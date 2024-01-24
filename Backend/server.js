import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import userRouter from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorMiddleware.js  ";
import userRoutes from './routes/userRoutes.js'
import donorRoutes from './routes/donorRoutes.js'
import patientRoutes from './routes/patientRoutes.js'




dotenv.config();
const app = express();

app.use(cors()); // Solving cors
app.use(express.json()); // Body parser middleware

// User Routes - create user, get users , get single user
app.use("/Admin", userRoutes);
app.use("/donors", donorRoutes);
app.use("/patients", patientRoutes);



app.use(errorHandler); // Error handler middleware <

const PORT = process.env.PORT || 3200; // takes port from .env or just put 3000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});