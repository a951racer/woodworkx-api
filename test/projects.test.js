import request from 'supertest'
import app from '../src/index.js'
import { expect } from 'chai'

let token
let projectId

beforeAll( async function() {
    token = await login()
    return
})

describe('Project Endpoints', () => {
    it('should return generic message', async function() {
        await request(app)
            .get('/')
            .expect(200)
            .expect('Node and express server is running on port')
    });
    
    it('should create a new project', async function() {
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

    it('should return list of projects', async function() {
        const res = await request(app)
            .get('/project')
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).to.equal(200)
        expect(res.headers["content-type"]).to.include('application/json')
        expect(res.body[0].name).to.equal('Test Project 123')
        expect(res.body[0].description).to.equal('test is cool')
        projectId = res.body[0]._id
    });

    it('should return specified project', async function() {
        const res = await request(app)
            .get(`/project/${projectId}`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).to.equal(200)
        expect(res.headers["content-type"]).to.include('application/json')
        expect(res.body.name).to.equal('Test Project 123')
        expect(res.body.description).to.equal('test is cool')
    });

    it('should return updated project', async function() {
        const res = await request(app)
            .put(`/project/${projectId}`)
            .send({
                name: 'Test Project 456',
                description: 'This is a new description'
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).to.equal(200)
        expect(res.headers["content-type"]).to.include('application/json')
        expect(res.body.name).to.equal('Test Project 456')
        expect(res.body.description).to.equal('This is a new description')
    });
        
    it('should delete project', async function() {
        const res = await request(app)
            .delete(`/project/${projectId}`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).to.equal(200)
        expect(res.headers["content-type"]).to.include('application/json')
        expect(res.body.message).to.equal('Successfully deleted Project')
    });
})

const login = async function() {
    const res = await request(app)
        .post('/auth/login')
        .send({
            email: 'joe.blow@test.com',
            password: 'Jeg22713'
        })
    return res.body.token
} 

