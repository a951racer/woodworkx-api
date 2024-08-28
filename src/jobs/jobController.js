import mongoose from 'mongoose'

const Schema = mongoose.Schema

import Job from './jobModel.js'

export default {
    async getJobs (req, res) {
        const jobs = await Job.find().sort({name: 1}).exec()
        res.json(jobs);
    },

    async getJobWithID (req, res) {
        const job = await Job.findById(req.params.jobId).exec()
        res.json(job);
    },

    async addNewJob (req, res) {
        const job = await Job.create(req.body)
        res.json(job)
    },

    async updateJob (req, res) {
        const job = req.body
        const updatedJob = await Job.findOneAndUpdate({ _id: req.params.jobId}, job, { new: true })
        res.json(updatedJob);
    },

    async deleteJob (req, res) {
        await Job.remove({ _id: req.params.jobId })
        res.json({ message: 'Successfully deleted Job'});
    }
}