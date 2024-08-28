import mongoose from 'mongoose';
import Report from '../reports/reportModel.js'
import Board from '../boards/boardModel.js'
import LibraryItem from '../library/libraryItemModel.js'
import Note from '../notes/noteModel.js';

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tags: [String],
    description: String,
    coverImage: String,
    reports: [Report.schema],
    boards: [Board.schema],
    model: String,
    library: [LibraryItem.schema],
    notes: [Note.schema]
});

export default mongoose.model('Project', ProjectSchema);