import passport from "passport";
import {Strategy as LocalStrategy, Strategy} from 'passport-local'
import { userModel} from '../models/user.model.js'
import { createHash, isValidPassword} from './bcrypt.js'

const initializePassport = () => {
    passport.use('login', new LocalStrategy(
        {usernameField: 'email'},
        async (username, password, done) => {
            try{        
            const user = await userModel.findOne({ email: username })
            if(!user) {
                return done(null, false, "User doesn´t exists")
            }
            if(!isValidPassword(user, password)) {
                return done(null, false, "Invalid Password");
            }    
            return done(null, user)
            }
            catch(error){
                return done(error)
            }
        }
    ))
    passport.use('register', new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'},
    async(req, username, password, done) => {
        const {first_name, last_name, email, age} = req.body
        try {
            const user = await userModel.findOne({email: username})
            if(user){
                console.log('User alread exists')
                return done(null, false)
            }
            const newUser= {
                first_name,
                last_name, 
                email, 
                age,
                password : createHash(password)            
            }
            const result = await userModel.create(newUser)
            return done(null, newUser)

        } catch (error) {
            return done(error)
        }
    }
    ))
    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser(async(id, done) => {
        const user = await userModel.findOne({_id : id})
        done(null, user)
      })
} 

export default initializePassport;