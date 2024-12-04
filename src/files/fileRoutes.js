import multer from 'multer'
import userController from '../users/userController.js'
import fileController from '../files/fileController.js'

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

export default function(app) {
    app.route('/file')
        //.get(loginRequired, files.getFiles)
        .post(userController.loginRequired, upload.single('file'), fileController.addNewFile);

    app.route('/file/:fileName')
        //.get(loginRequired, files.getFileWithID)
        //.delete(loginRequired, files.deleteFile);
}

