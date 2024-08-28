import request from 'supertest'
import app from '../index.js'

let token
let projectId

beforeAll( async () => {
    token = await login()
    return
})

describe('Project Endpoints', () => {
    it('should return generic message', async () => {
        await request(app)
            .get('/')
            .expect(200)
            .expect('Node and express server is running on port')
    });
    
    it('should create a new project', async () => {
        const res = await request(app)
            .post('/project')
            .set('Content-Type', 'application/json')
            .send({
                name: 'Test Project 123',
                description: 'test is cool',
                tags: ['Lorem', 'ipsum']
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })

    it('should return list of projects', async () => {
        const res = await request(app)
            .get('/project')
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(200)
        expect(res.headers["content-type"]).toContain('application/json')
        expect(res.body[0].name).toEqual('Test Project 123')
        expect(res.body[0].description).toEqual('test is cool')
        projectId = res.body[0]._id
    });

    it('should return specified project', async () => {
        const res = await request(app)
            .get(`/project/${projectId}`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(200)
        expect(res.headers["content-type"]).toContain('application/json')
        expect(res.body.name).toEqual('Test Project 123')
        expect(res.body.description).toEqual('test is cool')
    });

    it('should return updated project', async () => {
        const res = await request(app)
            .put(`/project/${projectId}`)
            .send({
                name: 'Test Project 456',
                description: 'This is a new description'
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(200)
        expect(res.headers["content-type"]).toContain('application/json')
        expect(res.body.name).toEqual('Test Project 456')
        expect(res.body.description).toEqual('This is a new description')
    });
        
    it('should delete project', async () => {
        const res = await request(app)
            .delete(`/project/${projectId}`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(200)
        expect(res.headers["content-type"]).toContain('application/json')
        expect(res.body.message).toEqual('Successfully deleted Project')
    });
})

const login = async () => {
    const res = await request(app)
        .post('/auth/login')
        .send({
            email: 'joe.blow@test.com',
            password: 'password123'
        })
    return res.body.token
} 

