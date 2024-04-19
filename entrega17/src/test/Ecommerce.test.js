import chai from 'chai'
import supertest from 'supertest'
import { userModel } from '../dao/models/user.model.js'

const expect = chai.expect
const requester = supertest.agent('http://localhost:8080')

describe('Testing Ecommerce', () => {
  describe('Testing Session', () => {
    it('Debe registrar correctamente un usuario', async () => {
      const mockUser = {
        first_name: 'Elmerindio',
        last_name: 'Caderoso',
        email: 'elmercaderoso@gmail.com',
        age: 22,
        password: '123456',
        role: 'premium'
      }
      const { ok, statusCode } = await requester
        .post('/api/session/register')
        .send(mockUser)
      expect(ok).to.be.ok
      expect(statusCode).to.equal(201)
    })
    it('No debe registrar un usuario existente', async () => {
      const mockUser = {
        first_name: 'Elmerindio',
        last_name: 'Caderoso',
        email: 'elmercaderoso@gmail.com',
        age: 22,
        password: '123456'
      }
      const { ok, statusCode } = await requester
        .post('/api/session/register')
        .send(mockUser)
      expect(ok).to.be.equal(false)
      expect(statusCode).to.equal(302)
    })

    it('Debe loguear correctamente al usuario', async () => {
      const mockUser = {
        email: 'elmercaderoso@gmail.com',
        password: '123456',
      }
      await requester
        .post('/api/session/login')
        .send(mockUser)
        .expect(302)
        .expect('Location', '/')
    })

    it('Debe enviar la info de la session que contiene el usuario y desestructurarla correctamente', async () => {
      const { _body } = await requester.get('/api/session/current')
      expect(_body.first_name).to.be.equal('Elmerindio')
      expect(_body.email).to.be.equal('elmercaderoso@gmail.com')
    })
  })
  describe('Testing Products', () => {
    it('Debe dar de alta correctamente un producto', async () => {
      const productMock = {
        title: 'Mock Product',
        price: 122.5,
        description: 'Mocking Products',
        code: 'AAAA 3333 FFFF',
        stock: 14,
        status: true,
        category: 'Mocks',
        owner: 'prueba@prueba.com',
      }

      const {statusCode, _body} = await requester.post('/api/products').send(productMock)
        expect(statusCode).to.be.eql(200);
        expect(_body.payload).to.have.property('_id');
    })
    it('No debe permitir dar de alta un producto sin campos requeridos, ej. title', async () => {
    const productMock = {
        price: 122.5,
        description: 'Mocking Products',
        code: 'AAAA 3333 FFFF 2222',
        stock: 14,
        status: true,
        category: 'Mocks',
        owner: 'prueba@prueba.com',
      }

      const {statusCode} = await requester.post('/api/products').send(productMock)
        expect(statusCode).to.be.eql(400);
       
    })
    it('Devuelve todos los productos dados de alta', async () => {
      const { _body,statusCode } = await requester.get('/api/products')
      expect(_body.payload).to.be.an('array')
      expect(statusCode).to.be.eql(200)

    })
    it('Devuelve todos los productos de una categoría en particular', async()=> {
        const { _body,statusCode } = await requester.get('/api/products?query=category:computers')
        expect(_body.payload).to.be.an('array')
        expect(statusCode).to.be.eql(200)
    })
  })
  describe('Testing Cart',  () =>{
    it('Agregamos un producto en un carrito', async()=> {
        const productMock = {
        title: 'Mock Product 2',
        price: 122.5,
        description: 'Mocking Products',
        code: 'AAAA 3333 FFFF 2222',
        stock: 14,
        status: true,
        category: 'Mocks',
        owner: 'prueba@prueba.com',
      }

      const { _body } = await requester.post('/api/products').send(productMock)
      const {  } = await requester.get('/api/session/current')      
      await requester.post(`/api/carts/${cartId}/product/${_body.payload._id}`)
    })
  })
})
