import { S3Client, PutObjectCommand  } from '@aws-sdk/client-s3'
import mongoose from 'mongoose'
import boardService from '../boards/boardService.js'

const Project = mongoose.model('Project')

export default {

/*
    exports.getFiles = (req, res) => {
        Project.find()
            .sort({name: 1})
            .exec((err, projects) => {
            if (err) {
                res.send(err);
            }
            res.json(projects);
        });
    };

    exports.getProjectWithID = (req, res) => {
        Project.findById(req.params.projectId)
            .exec(function(err, project) {
            if (err) {
                res.send(err);
            }
            res.json(project);
        })
    }
*/

    async addNewFile  (req, res) {
        const { body } = req
        const { mediaType, id } = body
        const file = req.file
        let folder = ''
        let fileName = ''

        switch (mediaType) {
            case 'thumbnail':
                folder = `${id}/`
                fileName = folder + 'Thumbnail.png'
                break
            case 'boards':
                folder = `${id}/`
                fileName = folder + 'Boards.csv'
                break
            case 'project-media':
                folder = `${id}/library/`
                fileName = folder + file.originalname
                break
            case 'job-media':
                folder = `${id}/library/`
                fileName = folder + file.originalname
                break
            case 'library':
                folder = 'library/'
                fileName = folder + file.originalname
                break
        }

        let s3bucket = new S3Client({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        })

        var params = {
            Bucket: process.env.AWS_BUCKET_NAME, //+ folder,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype
        }

        try {
            const results = await s3bucket.send(new PutObjectCommand(params))
            if (mediaType === 'boards') {
                boardService.importBoards(id, req.user._id, (err, project) => {
                    if (err) {
                        return res.send(err)
                    }
                    return res.json(project)
                })
            } else {
                return res.send({ results })
            }
        }
        catch (err) {
            res.status(500).json({ error: true, Message: err })
        }
    }
}
