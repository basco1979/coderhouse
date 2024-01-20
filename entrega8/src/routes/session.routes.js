import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";

const sessionRoutes = Router();

sessionRoutes.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const user = await userModel.create({
            first_name, last_name, age, email, password
        });
     //   req.session.user = user;
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(400).send({error});
    }
});

sessionRoutes.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(req.body.email === 'adminCoder@coder.com' && req.body.password === 'adminCod3r123'){
        req.session.user = {
            first_name : "Admin",
            last_name: "",
            rol : "admin"
        }    
        return res.redirect('/products');

        }
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }        
        if(user.password !== password){
            return res.status(401).send({message: 'Invalid credentials'});
        }
        
        req.session.user = user;
        req.session.user = Object.assign({...user._doc, rol: "user"}, req.session.user);
        res.redirect('/products');
    } catch (error) {
        res.status(400).send({error});
    }
});

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

export default sessionRoutes;