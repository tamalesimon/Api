const router = require('express').Router();
const gravatar = require('gravatar');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
//const { registrationValidation } = require('../validation/validation')
//validation
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');



//registering users
router.post('/register',  async (req, res) => {
 //res.send('Registered')

 //validation schema
 const registerSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
  });

  let { name, email, password } = req.body;

  // validation
  const {error} = registerSchema.validate(req.body);
 if(error) return res.status(400).send(error.details[0].message);

 //Check if user exists
 const emailExists = await User.findOne({email});
 if(emailExists) return res.status(400).send('Email already exists');

 //hash the password
 const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
 
 let avatar = gravatar.url(email , {
    s : '200',
    r : 'pg',
    d : 'mm'
});
 const user = new User({
     name,
     email,
     password,
     avatar
 });

 try {
     //saving user
     const savedUser = await user.save();
     res.send({user: user.name});
 } catch (err) {
     res.status(400).send(err);
 }
    
});

//User login
router.post('/login', async (req, res) => {

    //joi login validation
    const loginSchema = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
      });

      const { error } =  loginSchema.validate(req.body);
      if(error) return res.status(400).send(error.details[0].message);

      let { email, password } = req.body;

      //Check if user exists
        const user = await User.findOne({email});
        if(!user) return res.status(400).send('user is not registered');

        //checki password
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).send('Incorrect password');

        //create and assign token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('authentication_token', token).send(token);

});


module.exports = router;