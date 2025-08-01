import jwt from 'jsonwebtoken'

export const generatetokken = (userid)=>
{
 const token= jwt.sign({userid},process.env.JWT_SECRET)
 return token
}