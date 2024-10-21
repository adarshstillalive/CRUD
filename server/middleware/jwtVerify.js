import jwt from 'jsonwebtoken';
import User from '../model/userModel';

const jwtVerify = async (req, res, next)=>{
  try {
    
    const {token} = req.body.cookies;;

    const decodedValue = await jwt.verify(token, process.env.JWT_SECRET);
    if(decodedValue){
      const user = await User.findById(decodedValue);
      if(user){
        req.user = user;
        next()
      }
    }

  } catch (error) {
    console.log(error)
    return res.status(400).json('Invalid cookie')
  }
}

export default jwtVerify