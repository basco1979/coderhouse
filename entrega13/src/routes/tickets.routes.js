import { Router } from './router.js'
import { getTickets, getTicketById, createTicket } from '../controllers/tickets.controller.js'

export default class TicketsRouter extends Router {
  init() {
this.get('/', ['PUBLIC'], getTickets)
this.get('/:tid',['USER'], getTicketById)
this.post('/', ['PUBLIC'], createTicket)
  
  }}