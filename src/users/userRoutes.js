//import { login, register, fetch, update } from './userController.js';
import userController from "./userController.js"

export default function(app) {
    app.route('/auth/register')
        .post(userController.register)

    app.route('/auth/login')
        .post(userController.login)

    app.route('/user/:userId')
        .get(userController.fetch)
        .put(userController.update)
        .delete(userController.delete)
}
