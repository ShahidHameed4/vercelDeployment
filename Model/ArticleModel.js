import mongoose from 'mongoose';


const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    default: false
  },
  tags: {
    type: [String]
  }
}, {
  timestamps: true
});

const Article = mongoose.model('Article', articleSchema);

export default Article;