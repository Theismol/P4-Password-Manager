const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const router = express.Router();
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow cookies to be sent with requests
}));
app.use(express.json());
const connectDB = require('./src/utils/DB/Mongo.js');
const userRoutes = require('./src/routes/userRoutes.js');
const signupRoutes = require('./src/routes/signupRoutes.js');
const authRoutes = require('./src/routes/authRoutes.js');
const passwordRoutes = require('./src/routes/passwordRoutes.js');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());


connectDB();

app.use(express.static('public'));

// Use the user routes
app.use('/api/user', userRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});