const moongoose = require('mongoose')
const Schema = moongoose.Schema()

const userSchema = new Schema({
  name: {
    type: string,
    required: true
  },
  email: {
    type: string,
    required: true
  },
  password: {
    type: string,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = moongoose.model('User', userSchema)