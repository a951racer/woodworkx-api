import request from 'supertest'
import app from '../index.js'

let token
let userId

describe('User Endpoints', () => {
    it('should register test user', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                email: 'john.doe@test.com',
                password: 'passwordXYZ',
                firstName: 'John',
                lastName: 'Doe'
            })
            .expect(200)
        expect(res.body.firstName).toEqual('John')
        expect(res.body.lastName).toEqual('Doe')
        userId = res.body._id
    })

    it('should log user in', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'joe.blow@test.com',
                password: 'password123',
            })
           .expect(200)
        token = res.body.token
    })

    it('should fetch user', async () => {
        const res = await request(app)
            .get(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body.firstName).toEqual('John')
        expect(res.body.lastName).toEqual('Doe')
        expect(res.body.email).toEqual('john.doe@test.com')
    })

    it('should update user', async () => {
        const res = await request(app)
            .put(`/user/${userId}`)
            .send({
                lastName: 'Hooligan',
                firstName: 'Jimmy',
                email: 'jimmy.hooligan@tester.com'
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body.firstName).toEqual('Jimmy')
        expect(res.body.lastName).toEqual('Hooligan')
        expect(res.body.email).toEqual('jimmy.hooligan@tester.com')
    })

    it('should delete user', async () => {
        const res = await request(app)
            .delete(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body.message).toEqual('Successfully deleted User')
    })
})