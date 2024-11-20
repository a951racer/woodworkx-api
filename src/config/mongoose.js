import { mongoose } from 'mongoose'

function configureMongoose() {
  mongoose.Promise = global.Promise
  let conn_string = process.env.NODE_ENV === 'test' ? process.env.MONGO_CONNECT_STRING_TEST : process.env.MONGO_CONNECT_STRING
  const db = mongoose.connect(conn_string)

  console.log('connected to: ', conn_string)
  return db
};

export default configureMongoose