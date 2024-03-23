import jwt from 'jsonwebtoken' 
export const generateToken = (user) => {
    const secret = 'c0derH0us3'
    const  expiresIn = '1h'
     return jwt.sign({user}, secret, {expiresIn})   
}