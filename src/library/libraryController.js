import mongoose from 'mongoose'
import Library from './libraryItemModel.js'

const Schema = mongoose.Schema

export default {
    async getItem (req, res) {
        const libraryItems = await Library.find().sort({title: 1}).exec()
        res.json(libraryItems)
    },

    async getItemWithID  (req, res) {
        const item = await Library.findById(req.params.itemId).exec()
        res.json(item)
    },

    async addNewItem (req, res) {
        const item = await Library.create(req.body)
        res.json(item)
    },

    async updateItem (req, res) {
        const item = req.body
        const updatedItem = await Library.findOneAndUpdate({ _id: req.params.itemId}, item, { new: true })
        res.json(item)
    },

    async deleteItem (req, res) {
        const item = Library.remove({ _id: req.params.itemId })
        res.json({ message: 'Successfully deleted Library Item'})
    }
}