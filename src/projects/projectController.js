import Project from './projectModel.js'
import boards from '../boards/boardService.js';


export default {
    async getProjects (req, res) {
        const projects = await Project.find().sort({name: 1}).exec()
        res.json(projects)
    },

    async getProjectWithID (req, res) {
        const project = await Project.findById(req.params.projectId).exec()
        res.json(project);
    },

    async addNewProject (req, res) {
        const project = await Project.create(req.body)
        res.json(project)
    },

    async updateProject (req, res) {
        const project = req.body
        const updatedProject = await Project.findOneAndUpdate({ _id: req.params.projectId}, project, { new: true })
        res.json(updatedProject);
    },

    async deleteProject (req, res) {
        const deletedProject = await Project.deleteOne({ _id: req.params.projectId })
        res.json({ message: 'Successfully deleted Project'});
    },

    async importBoards (req, res) {
        const projectId = req.params.projectId
        const userId = req.user._id

        await boards.importBoards(projectId, userId, (err, project) => {
            if (err) {
                res.send(err)
            }
            res.json(project)
        })
    }
}
