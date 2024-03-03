import { Router } from './router.js'
import passport from 'passport'
import { adminProducts, currentUser, login, register, logout, restorePassword } from '../controllers/session.controller.js';



export default class SessionRouter extends Router {
  init() {
    this.post(
      '/login',
      ['PUBLIC'],
      passport.authenticate('login', { failureRedirect: '/faillogin' }),
      login
    )

    this.post(
      '/register',
      ['PUBLIC'],
      passport.authenticate('register', { failureRedirect: '/failregister' }),
     register
    )

this.get('/github', ['PUBLIC'], passport.authenticate('github', {scope: ['user:email']}), async(req, res)=> {})
this.get('/githubcallback',['PUBLIC'], passport.authenticate('github', {failureRedirect: '/login'}), async(req, res)=> {
    req.session.user = req.user
    res.redirect('/')
})

this.post('/logout',['USER', 'ADMIN'], logout);

this.post('/restore-password', ['PUBLIC'], restorePassword)

this.get('/current', ['USER', 'ADMIN'], currentUser)

this.get('/admin', ['ADMIN'], adminProducts)

  }
}
