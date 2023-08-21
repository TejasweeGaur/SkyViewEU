const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100 // 50 requests per 10 mins
});

app.use(limiter);
app.set('trust proxy', 1);

// Set static Folder
app.use(express.static('../public/'));

app.use("/api", require("./routes/7timerRoutes.js"));

//Enable Cors
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port - ${PORT}`));