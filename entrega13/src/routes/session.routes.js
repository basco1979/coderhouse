import { Router } from 'express'
import passport from 'passport'
import { isAdmin} from '../middlewares/auth.js'
import { adminProducts, currentUser, login, register, logout, restorePassword } from '../controllers/session.controller.js';

const sessionRouter = Router()

    sessionRouter.post(
      '/login',
      passport.authenticate('login', { failureRedirect: '/faillogin' }),
      login
    )

    sessionRouter.post(
      '/register',
      passport.authenticate('register', { failureRedirect: '/failregister' }),
     register
    )

sessionRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req, res)=> {})
sessionRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async(req, res)=> {
    req.session.user = req.user
    res.redirect('/')
})

sessionRouter.post('/logout', logout);

sessionRouter.post('/restore-password', restorePassword)

sessionRouter.get('/current', currentUser)

sessionRouter.get('/admin', isAdmin , adminProducts)

export default sessionRouter;

