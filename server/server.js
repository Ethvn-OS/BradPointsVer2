import authRouter from './routes/authRoutes.js'
import express from 'express'
import cors from 'cors'

const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', authRouter);

app.listen(process.env.PORT, () => {
    console.log('Server started on port 8080');
});

/*

TEST RA NI
app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "orange", "banana"] });
});

*/