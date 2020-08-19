const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//import routes
const authRoute = require('./myRoutes/auth');
const adminRoute = require('./myRoutes/admin');


dotenv.config({path:'config.env'});

app.use(cors());

//connnect to db
mongoose.connect(process.env.DB_CONNECT,
        {useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
       },   
    () => console.log('Your connected to db!')
);

//middleware for handling forms data
app.use(express.json());


//route middleware
app.use('/api/user', authRoute);
app.use('/api/admin', adminRoute);


app.listen(6000, () => console.log('Server is up and running...'));