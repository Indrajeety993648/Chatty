
import express  from 'express';
import authRoutes from './routes/auth.route.js';
const app = express();

app.use("/api/auth" , authRoutes);
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port : ${process.env.PORT || 5000}`);
});

