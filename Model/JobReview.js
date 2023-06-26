import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const applicationReviewSchema = new Schema({
  employer: {
    type: String,
    ref: 'Employer',
    required: true
  },
  jobApplication: {
    type: String,
    ref: 'JobApplication',
    required: true
  },
  reviewMessage: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  dateReviewed: {
    type: Date,
    default: Date.now
  }
});

const ApplicationReview = mongoose.model('ApplicationReview', applicationReviewSchema);

export default ApplicationReview;