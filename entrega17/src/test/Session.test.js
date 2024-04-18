import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requester = supertest.agent('http://localhost:8080')

describe('Testing Session', () => {
  it('Debe registrar correctamente un usuario', async () => {
    const mockUser = {
      first_name: "Elmerindio",
      last_name: "Caderoso",
      email: "elmercaderoso@gmail.com",
      age: 22,
      password: "123456"
    }
    const {ok, statusCode} = await requester.post("/api/session/register").send(mockUser)
    expect(ok).to.be.ok;
    expect(statusCode).to.equal(201)
  })
  it('No debe registrar un usuario existente', async () => {
    const mockUser = {
      first_name: "Elmerindio",
      last_name: "Caderoso",
      email: "elmercaderoso@gmail.com",
      age: 22,
      password: "123456"
    }
    const {ok, statusCode} = await requester.post("/api/session/register").send(mockUser)
    expect(ok).to.be.equal(false);
    expect(statusCode).to.equal(302)
  })
  it("Debe loguear correctamente al usuario", async () => {
     const mockUser = {
      email: "elmercaderoso@gmail.com",
      password: "123456"
    }
    await requester.post('/api/session/login').send(mockUser).expect(302).expect('Location', '/')
     });
it("Debe enviar la info de la session que contiene el usuario y desestructurarla correctamente", async () => {
      const { _body } = await requester
        .get("/api/session/current")
      expect(_body.first_name).to.be.equal("Elmerindio");
      expect(_body.email).to.be.equal("elmercaderoso@gmail.com");
    });

})
