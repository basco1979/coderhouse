import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import passport from "passport";

const sessionRoutes = Router();

sessionRoutes.post('/register',passport.authenticate('register', {failureRedirect: '/failregister'}), async (req, res) => {
   res.status(201).send({message : "User registered"})
});



sessionRoutes.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}),async(req, res) => {
    if(!req.user) {
        res.status(400).send({message: "Error with credentials"})
    }
    req.session.user = {
        //el req.user viene de la serializacion hecha con passport
        first_name : req.user.first_name,
        last_name : req.user.last_name,
        age : req.user.age,
        email: req.user.email,
        role: req.user.role ? req.user.role : 'user'
    }
    res.redirect('/')    
});

sessionRoutes.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req, res)=> {})
sessionRoutes.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async(req, res)=> {
    req.session.user = req.user
    res.redirect('/')
})

sessionRoutes.post('/logout', async(req, res) => {
    try {
        req.session.destroy((err) => {
            if(err){
                return res.status(500).json({message: 'Logout failed'});
            }
        });
        res.send({redirect: 'http://localhost:8080/login'});
    } catch (error) {
        res.status(400).send({error});
    }
});

sessionRoutes.post('/restore-password', async(req, res) => {
    const {email,password} = req.body
    
    try {
   const user = await userModel.findOne({ email }) 
    if(!user) {
        return res.status(401).send({message : "User not found"})
    }
    user.password = createHash(password)
    await user.save()
    res.send({message : "Password updated"})     
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
})

sessionRoutes.get('/current', async(req, res) => {
    res.send({
        first_name : req.user.first_name,
        last_name : req.user.last_name,
        age : req.user.age,
        email: req.user.email,
        role: req.user.role ? req.user.role : 'user'
    });
})

export default sessionRoutes;