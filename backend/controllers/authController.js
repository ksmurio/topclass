// backend/controllers/authController.js
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getTimestampIdentifier } from 'vuetify/lib/labs/VCalendar/util/timestamp.mjs';


// Register user
export const register = async (req, res) => {
  const { full_name, username, email, password } = req.body;

  if (!full_name || !username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please fill all fields' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const newUser = await User.create({ full_name, username, email, password });
    res.status(201).json({ success: true, message: 'User created successfully', user: newUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Please check the inputs' });
  }
};

// Login user

export const login = async(req, res) =>{
  const  { email, password } = req.body;

  if(!email || !password){
    return res.status(400).json({ success:false, message: 'Please fill all fields'})
  }
  try{
    const user =  await User.findOne({where: {email}});

    if(!user){
      return res.status(401).json({success:false, message: 'User not found'});
    }

    const senhacorreta = await bcrypt.compare(password, user.password);

    if(!senhacorreta){
      return res.status(401).json({success:false, message:'Password incorrect'});
    }

    // if email are correct 

    const token = jwt.sign({id: user.id,email:user.email},process.env.JWT_SECRET,{expiresIn:'24h'});

    return res.status(200).json({success:true,message:'Login succesful',token, user:{id:user.id,full_name:user.full_name,username:user.username,email:user.email}});
  }catch(error){
    console.error('error ao fazer login', error);
    return res.status(500).json({success:false,message:'error during login'})
  }
}


