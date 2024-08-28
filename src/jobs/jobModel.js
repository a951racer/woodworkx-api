import mongoose from 'mongoose'
import LibraryItem from '../library/libraryItemModel.js'
import Report from '../reports/reportModel.js'
import Board from '../boards/boardModel.js'
import Note from '../notes/noteModel.js';

const Schema = mongoose.Schema

const TimeSlipSchema = new Schema({
    date: Date,
    type: String,
    hours: Number
})

const MaterialSchema = new Schema({
  date: Date,
  category: String,
  vendor: String,
  item: String,
  cost: Number,
})

const JobSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tags: [String],
    description: String,
    customer: String,
    startDate: Date,
    endDate: Date,
    projectId: {  type: Schema.Types.ObjectId, ref: 'Project' },
    timeSlips: [TimeSlipSchema],
    materials: [MaterialSchema],
    coverImage: String,
    reports: [Report.schema],
    boards: [Board.schema],
    library: [LibraryItem.schema],
    notes: [Note.schema]
});

export default mongoose.model('Job', JobSchema)