import { Router } from 'express'

const viewsRouter = Router()

viewsRouter.get('/', async (req, res) => {
  res.render('chat', {title: 'Chat', style: 'chat.css'})
})

export default viewsRouter
