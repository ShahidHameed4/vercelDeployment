import mongoose from 'mongoose'
const Schema = mongoose.Schema
const UserInfo = new Schema({
  name: { type: String, required: true, max: [127, 'Max Length is 127 characters'] },
  city: { type: String, required: true, max: [127, 'Max Length is 127 characters'] },
  bio: { type: String, required: true, max: [127, 'Max Length is 127 characters'] },
  role: { type: String, required: true, max: [127, 'Max Length is 127 characters'] },
  imgLink: { type: String, required: false, max: [127, 'Max Length is 127 characters'] },
  email: { type: String, required: true, max: [127, 'Max Length is 127 characters'] },
  password: { type: String, required: true, max: [127, 'Max Length is 127 characters'] },
  mobile: { type: String, required: true, max: [127, 'Max Length is 127 characters'] },
},
{
  timestamps: true
})

const userInfo = mongoose.model('UserInfo', UserInfo)
export default userInfo
