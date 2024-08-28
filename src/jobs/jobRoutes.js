import user from '../users/userController.js'
import job from './jobController.js'

export default function(app) {
    app.route('/job')
        .get(user.loginRequired, job.getJobs)
        .post(user.loginRequired, job.addNewJob)

    app.route('/job/:jobId')
        .get(user.loginRequired, job.getJobWithID)
        .put(user.loginRequired, job.updateJob)
        .delete(user.loginRequired, job.deleteJob)
}

