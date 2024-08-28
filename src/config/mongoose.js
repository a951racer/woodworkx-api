import { mongoose } from 'mongoose'
//import userModel from '../users/userModel.js'

function configureMongoose() {
  mongoose.Promise = global.Promise
  let conn_string = process.env.NODE_ENV === 'test' ? process.env.MONGO_CONNECT_STRING_TEST : process.env.MONGO_CONNECT_STRING
  const db = mongoose.connect(conn_string)

  //require('../models/projectModel')
  //require('../models/libraryItemModel')
  //require('../models/jobModel')
  //require('../models/boardModel')
  //require('../models/noteModel')
  //require('../models/reportModel')

  console.log('connected')
  return db
};

export default configureMongoose