import { Router } from 'express'
import { getTickets, getTicketById, createTicket } from '../controllers/tickets.controller.js'
import { isAdmin, isUser } from '../middlewares/auth.js'

const ticketsRouter = Router()

ticketsRouter.get('/', isAdmin, getTickets)
ticketsRouter.get('/:tid', isUser, getTicketById)
ticketsRouter.post('/', isUser, createTicket)

export default ticketsRouter