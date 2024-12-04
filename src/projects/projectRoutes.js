import userController from '../users/userController.js'
import projectController from './projectController.js'

export default function(app) {
    app.route('/project')
        .get(userController.loginRequired, projectController.getProjects)
        .post(userController.loginRequired, projectController.addNewProject)

    app.route('/project/:projectId')
        .get(userController.loginRequired, projectController.getProjectWithID)
        .put(userController.loginRequired, projectController.updateProject)
        .delete(userController.loginRequired, projectController.deleteProject)

    app.route('/project/import-boards/:projectId')
        .post(userController.loginRequired, projectController.importBoards)

}

