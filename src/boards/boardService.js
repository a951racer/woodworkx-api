//const AWS = require('aws-sdk')
import mongoose from 'mongoose'
//import { parse } 'csv-parse'

import Project from '../projects/projectModel.js'
import User from '../users/userModel.js'

export default {

    async importBoards (projectId, userId, callback) {
        const project = await Project.findById(projectId)
        const profile = await User.findById(userId)

        let boards = []
        let newBoard = {}
        const parser = parse()

        const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK
        let s3bucket = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        })

        var params = {
            Bucket: process.env.AWS_BUCKET_NAME + `/${projectId}`,
            Key: 'Boards.csv',
        }

        const s3Stream = s3bucket.getObject(params).createReadStream()
        s3Stream.pipe(parser)
            .on('data', (data) => {
                if (data[0] !== 'Part Number') {
                    newBoard = {
                        'label': data[0],
                        'name': data[1],
                        'quantity': data[2],
                        'finalWidth': data[3],
                        'finalLength': data[4],
                        'finalThickness': data[5],
                        'roughWidth': parseFloat(data[3]) + parseFloat(profile.roughWidth),
                        'roughLength': parseFloat(data[4]) + parseFloat(profile.roughLength),
                        'roughThickness': parseFloat(data[5]) + parseFloat(profile.roughThickness),
                        'material': data[6],
                        'description': data[7]
                    }
                    boards.push(newBoard)
                    newBoard = {}
                }
            })
            .on("end", function () {
                project.boards = boards
                Project.findOneAndUpdate({ _id: projectId}, project, { new: true }, (err, project) => {
                    if (err) {
                        return callback(err)
                    }
                    return callback(null, project)
                })
            
            })
    }

}