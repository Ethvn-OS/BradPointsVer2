import authRouter from './routes/authRoutes';

const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: ["http://localhost:5173"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', authRegister);

app.listen(process.env.PORT, () => {
    console.log('Server started on port 8080');
});

/*

TEST RA NI
app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "orange", "banana"] });
});

*/