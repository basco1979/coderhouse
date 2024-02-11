import { Router } from "express";
import { checkAuth, checkingExistingUser } from '../middlewares/auth.middleware.js'

const viewsRoutes = Router()

viewsRoutes.get('/', checkAuth, (req, res) => {
    
    const user = req.session.user 
    res.render('index', user)
})

viewsRoutes.get('/login', checkingExistingUser, (req, res) => {
    res.render('login')
})


viewsRoutes.get('/register', checkingExistingUser, (req, res) => {
    res.render('register')
})

viewsRoutes.get('/fail-login', (req, res) => {
    res.render('fail-login')
})


viewsRoutes.get('/fail-register', (req, res) => {
    res.render('fail-register')
})


export default viewsRoutes