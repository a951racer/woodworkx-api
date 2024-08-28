import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    created: Date,
    tags: [String],
    type: String,
    body: String,
});

export default mongoose.model('Note', NoteSchema);