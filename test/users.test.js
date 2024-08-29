import request from 'supertest'
import app from '../src/index.js'
import { expect } from 'chai'

let token
let userId

describe('User Endpoints', function() {
    it('should register test user', async function() {
        const res = await request(app)
            .post('/auth/register')
            .send({
                email: 'john.doe@test.com',
                password: 'passwordXYZ',
                firstName: 'John',
                lastName: 'Doe'
            })
            .expect(200)
        expect(res.body.firstName).to.equal('John')
        expect(res.body.lastName).to.equal('Doe')
        userId = res.body._id
    })

    it('should log user in', async function() {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'joe.blow@test.com',
                password: 'Jeg22713',
            })
           .expect(200)
        token = res.body.token
    })

    it('should fetch user', async function() {
        const res = await request(app)
            .get(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body.firstName).to.equal('John')
        expect(res.body.lastName).to.equal('Doe')
        expect(res.body.email).to.equal('john.doe@test.com')
    })

    it('should update user', async function() {
        const res = await request(app)
            .put(`/user/${userId}`)
            .send({
                lastName: 'Hooligan',
                firstName: 'Jimmy',
                email: 'jimmy.hooligan@tester.com'
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body.firstName).to.equal('Jimmy')
        expect(res.body.lastName).to.equal('Hooligan')
        expect(res.body.email).to.equal('jimmy.hooligan@tester.com')
    })

    it('should delete user', async function() {
        const res = await request(app)
            .delete(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body.message).to.equal('Successfully deleted User')
    })
})