import { S3Client, GetObjectCommand  } from '@aws-sdk/client-s3'
import { parse } from 'csv-parse'

import Project from '../projects/projectModel.js'
import User from '../users/userModel.js'

export default {

    async importBoards (projectId, userId, callback) {
        const project = await Project.findById(projectId)
        const profile = await User.findById(userId)

        let boards = []
        let newBoard = {}
        const parser = parse()

        let s3bucket = new S3Client({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        })

        var params = {
            Bucket: process.env.AWS_BUCKET_NAME, // + `/${projectId}`,
            Key: `${projectId}/Boards.csv`,
        }

        const { Body } = await s3bucket.send(new GetObjectCommand(params))
        Body.pipe(parser)
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
            .on("end", async function () {
                project.boards = boards
                await Project.findOneAndUpdate({ _id: projectId}, project, { new: true })
                return callback(null, project)
            })
    }

}