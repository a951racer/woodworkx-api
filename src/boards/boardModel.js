import mongoose from 'mongoose'

const Schema = mongoose.Schema

const BoardSchema = new Schema(
  {
    label: String,
    name: String,
    quantity: Number,
    material: {
      type: String,
      enum: ['Sheet', 'Dimensional', 'Hardwood']
    },
    roughLength: Number,
    roughWidth: Number,
    roughThickness: Number,
    finalLength: Number,
    finalWidth: Number,
    finalThickness: Number,
    description: String,
    joinery: String,
    shaping: String
  },
  { timestamps: true }
)

export default mongoose.model('Board', BoardSchema)