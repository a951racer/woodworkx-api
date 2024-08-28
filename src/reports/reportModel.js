import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ReportSchema = new Schema(
    {
        title: String,
        type: String,
        path: String
    },
    { timestamps: true }
)

export default mongoose.model('Report', ReportSchema)