const {User} = require('../models');
const jwt = require('jsonwebtoken')
const ImageKit = require('imagekit');
const validator = require("validator");
const bcrypt = require("bcrypt");



const createToken = (_id) => {
  return jwt.sign({_id},process.env.SECRET,{expiresIn: '7d'})
}

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});


const getImageKitAuth = (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.status(200).json(result);
};

const loginUser = async (req, res) => {
  const {email,password} = req.body

  try {
    const user = await login(email,password)

    const token = createToken(user._id)

    res.status(200).json({email,token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};


//signup user
const signupUser = async (req, res) => {

  const {  username, email, password ,country} = req.body;

  try {
    
    const user = await signup(username, email, password,country);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { loginUser, signupUser, getProfile,getImageKitAuth };
const login = async function (email, password) {
  if (!email || !password) {
    throw Error("Email and password Required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

const signup = async function (username, email, password, country) {
  
  if (!username || !email || !password || !country) {
    throw Error(`First name, username, email, and password are all required`);
  }
  if (!validator.isEmail(email)) {
    throw Error(`Email is not valid`);
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(`Password is not strong enough`);
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw Error(`Email is already in use`);
  }

  const usernameExists = await User.findOne({ name:username });
  if (usernameExists) {
    throw Error(`Username is already taken`);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({ name:username, email, password: hash,country });

  return user;
};