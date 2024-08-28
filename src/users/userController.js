import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './userModel.js'

//const User = mongoose.model('User', UserSchema);

export default {
    async register (req, res) {
        const newUser = new User(req.body);
        newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
        let user = await newUser.save()
        let loggedinUser = {}
        for (let key of Object.keys(user._doc)) {
            loggedinUser[key] = user[key];
        }
        loggedinUser.hashPassword = undefined;
        loggedinUser.token = jwt.sign({ email: user.email, username: user.username, _id: user.id}, process.env.SESSION_SECRET);
        return res.json(loggedinUser);
    },

    async fetch (req, res) {
        const user = await User.findById(req.params.userId)
        let foundUser = {}
        for (let key of Object.keys(user._doc)) {
            foundUser[key] = user[key];
        }
        foundUser.hashPassword = undefined;
        return res.json(foundUser)
    },

    async update (req, res) {
        await User.findByIdAndUpdate(req.params.userId, req.body)
        const updatedUser = await User.findById(req.params.userId)
        updatedUser.hashPassword = undefined
        return res.json(updatedUser)
    },

    async login (req, res) {
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. No user found!'});
        } else if (user) {
            if (!user.comparePassword(req.body.password, user.hashPassword)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password!'});
            } else {
                let loggedinUser = {}
                for (let key of Object.keys(user._doc)) {
                    loggedinUser[key] = user[key];
                }
                loggedinUser.hashPassword = undefined;
                loggedinUser.token = jwt.sign({ email: user.email, username: user.username, _id: user.id}, process.env.SESSION_SECRET);
                return res.json(loggedinUser);
            }
        }
    },

    async delete (req, res) {
        const deletedUser = await User.deleteOne({ _id: req.params.userId })
        res.json({ message: 'Successfully deleted User'});
    },


    loginRequired (req, res, next) {
        if (req.user) {
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized user!'});
        }
    }
}