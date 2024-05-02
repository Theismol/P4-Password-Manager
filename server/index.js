const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const router = express.Router();


//routes
const connectDB = require('./src/utils/DB/Mongo.js');
const userRoutes = require('./src/routes/userRoutes.js');
const signupRoutes = require('./src/routes/signupRoutes.js');
const authRoutes = require('./src/routes/authRoutes.js');
const passwordRoutes = require('./src/routes/passwordRoutes.js');
const deleteRoutes = require('./src/routes/deleteRoutes.js');
const organizationRoutes = require('./src/routes/organizationRoutes.js');
const keyExchangeRoutes = require('./src/routes/keyExchangeRoutes.js');



const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');




app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Allow cross-origin requests
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow cookies to be sent with requests
}));

app.use(express.json());



app.use(express.static('public'));


connectDB();


// Use the user routes
app.use('/api/user', userRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/delete', deleteRoutes);
app.use('/api/organization', organizationRoutes);
app.use('/api/keyExchange', keyExchangeRoutes)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});