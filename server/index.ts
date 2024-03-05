import connectDB from './src/utils/DB/Mongo'; // Remove the file extension from the import

// Rest of your code remains unchanged
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const router = express.Router(); 
app.use(cors());
app.use(express.json());

const userRoutes = require('./src/routes/userRoutes');
const loginRoutes = require('./src/routes/loginRoutes');

connectDB();

app.use(express.static('public'));

// Use the user routes
app.use('/api/user', userRoutes); 
app.use('/api/login', loginRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
