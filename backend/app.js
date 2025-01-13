require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

const coursesRoutes = require("./routes/coursesRoutes");
const authRoutes = require('./routes/authRoutes');


// Middleware
app.use(cors());
app.use(express.json());

//   app.use(cors(corsOptions));

app.use("/courses", coursesRoutes);
app.use('/auth', authRoutes);

// app.get("/", (req, res) => res.send("Backend is running!"));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


module.exports = app;