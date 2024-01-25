import passport from 'passport'
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import { userModel } from '../dao/models/user.model.js'
import { createHash, isValidPassword } from '../utils/bcrypt.js'

const LocalStrategy = local.Strategy

const initializePassport = () => {
  passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body
        try {
          const user = await userModel.findOne({ email: username })
          if (user) return done(null, false, 'Email already in use')
          const newUser = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          })
          return done(null, newUser)
        } catch (error) {
          return done('Error to obtain the user' + error)
        }
      }
    )
  )

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

    passport.use('github', new GitHubStrategy(
        {
            clientID:"Iv1.ec56f0ccf2b2136a",
            clientSecret:'3bea9f029c239387a4488c8a50b4e9d6a670e471',
            callbackURL:'http://localhost:8080/api/session/githubcallback'
        },
        async(accesToken, refreshToken, profile, done)=> {
            try {
                console.log(profile)
                let user = await userModel.findOne({email: profile._json.email})
                if(!user){
                    let newUser = {
                        first_name : profile._json.name,
                        last_name: ' ',
                        age:18,
                        email: profile._json.email,
                        password:' ' 
                    }
                    let result = await userModel.create(newUser)
                    done(null, result)
                }
                else{
                    done(null, user)
                }
            } catch (error) {
                return done(error)
            }
        }
    ))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async(id, done) => {
    const user = await userModel.findOne({_id : id})
    done(null, user)
  })
}

export default initializePassport
