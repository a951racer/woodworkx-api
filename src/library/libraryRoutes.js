import user from '../users/userController.js'
import library from './libraryController.js'

export default function(app) {
    app.route('/library')
        .get(user.loginRequired, library.getItem)
        .post(user.loginRequired, library.addNewItem);

    app.route('/library/:itemId')
        .get(user.loginRequired, library.getItemWithID)
        .put(user.loginRequired, library.updateItem)
        .delete(user.loginRequired, library.deleteItem)
}

