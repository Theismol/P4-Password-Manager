const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const router = express.Router(); // Create an instance of the router
app.use(cors());
app.use(express.json());
const connectDB = require('./src/configs/database.js');
const userRoutes = require('./src/routes/userRoutes.js');

connectDB();

app.use(express.static('public'));

// Use the user routes
app.use('/api/user', userRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
