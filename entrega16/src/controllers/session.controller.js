import { productModel } from '../dao/models/product.model.js'
import { userModel } from '../dao/models/user.model.js'
import { createHash, isValidPassword } from '../utils/bcrypt.js'
import { generateToken } from '../utils/token.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { usersService } from '../dao/repositories/index.js'

dotenv.config()


export const login = async (req, res) => {
  if (!req.user) {
    res.status(400).send({ message: 'Error with credentials' })
  }
  req.session.user = {
    //el req.user viene de la serializacion hecha con passport
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email,
    role: req.user.role ? req.user.role : 'user',
    cartId: req.user.cartId
  }
  res.redirect('/')
}

export const register = async (req, res) => {
  res.status(201).send({ message: 'User registered' })
}

export const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        req.logger.error(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} - Error to logout`)  
        return res.status(500).json({ message: 'Logout failed' })
      }
    })
    res.send({ redirect: 'http://localhost:8080/login' })
  } catch (error) {
        req.logger.error(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} - Error to logout`)  
    res.status(400).send({ error })
  }
}

//Current user info
export const currentUser = async (req, res) => {
  res.send({
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email,
    role: req.user.role ? req.user.role : 'user',
  })
}

/* export const getCurrentUser = async (req, res) => {
  res.send(req.user)
}
 */

export const adminProducts = async(req, res) => {
  const products = await productModel.find()
  res.render('admin', products)
}


export const sendEmail = async (req, res) => {
  const {email} = req.body;
  const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "basco79@gmail.com",
      pass: process.env.gmail,
    },
  });
 try {
  const token = generateToken(email)
    const result = await transport.sendMail({
      from: "Sebastian Basconcelo <basco79@gmail.com>",
      to: email,
      subject: "Restore password",
      html: `
                <div>
                    <h1>Hi!</h1>
                <a href="http://localhost:8080/restore-password?email=${email}&&token=${token}">Restore Password</a>
                </div>
            `,
            attachments:[]
    });
    res.send({ message: "Mail sent" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Could not send the email" });
  }
}

export const restorePassword = async (req, res) => {
  const { token, email} = req.query
  const {password} = req.body
  try {
    const user = await userModel.findOne({ email })
    if (!user) {
      req.logger.error(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} - User not found`)  
      return res.status(401).send({ message: 'User not found' })
    }
    if(!token){
      res.redirect('/send-email')
    }
    if(!isValidPassword(user, password)){
    user.password = createHash(password)
    await user.save()
    res.send({ message: 'Password updated' })
    }
    else{
      return res.send({message: 'The new password is equal to the old one.'})
    }
  } catch (error) {
    req.logger.error(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} - Error to restore password`)  
    res.status(400).send({ error })
  }
}

//Change user role to premium and the other way round
export const userToPremium = async (req, res)=> {
  const { uid } = req.params;
  try {
    const user = await userModel.findOne({ _id : uid })
    user.role = user.role === 'premium' ? user.role = 'user' : user.role = 'premium'
    const result = await usersService.updateUser(uid, user)
    res.send({message : `User role updated to ${user.role} `})
  } catch (error) {
    req.logger.error(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} - Error to update user`)  
  }
}