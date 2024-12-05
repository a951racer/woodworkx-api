import request from 'supertest'
import app from '../src/index.js'
import { expect } from 'chai'

let token
let projectId
let jobId

before( async function() {
    token = await login()
    const res = await request(app)
        .get('/Project')
        .set('Authorization', `Bearer ${token}`)
    projectId = res.body[0]._id
})

describe('Job Endpoints', () => {
    it('should create a new job', async function() {
        const res = await request(app)
            .post('/job')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Job 123',
                description: 'test is cool',
                tags: ['Lorem', 'ipsum'],
                customer: 'Jimmy Dean',
                startDate: '2025-04-01',
                endDate: '2025-05-01',
                projectId: projectId
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })

    it('should return list of jobs', async function() {
        const res = await request(app)
            .get('/job')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).to.equal(200)
        expect(res.headers["content-type"]).to.include('application/json')
        expect(res.body[0].name).to.equal('Test Job 123')
        expect(res.body[0].description).to.equal('test is cool')
        expect(res.body[0].customer).to.equal('Jimmy Dean')
        jobId = res.body[0]._id
    });

    it('should return specified job', async function() {
        const res = await request(app)
            .get(`/job/${jobId}`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).to.equal(200)
        expect(res.headers["content-type"]).to.include('application/json')
        expect(res.body.name).to.equal('Test Job 123')
        expect(res.body.description).to.equal('test is cool')
        expect(res.body.customer).to.equal('Jimmy Dean')
    });

    it('should return updated job', async function() {
        const res = await request(app)
            .put(`/job/${jobId}`)
            .send({
                name: 'Test Job 456',
                description: 'This is a new description'
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).to.equal(200)
        expect(res.headers["content-type"]).to.include('application/json')
        expect(res.body.name).to.equal('Test Job 456')
        expect(res.body.description).to.equal('This is a new description')
    });
    
    it('should delete job', async function() {
        const res = await request(app)
            .delete(`/job/${jobId}`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).to.equal(200)
        expect(res.headers["content-type"]).to.include('application/json')
        expect(res.body.message).to.equal('Successfully deleted Job')
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

