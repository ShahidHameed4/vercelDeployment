import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
  applicant: {
    type: String,
    ref: 'Student',
    required: true
  },
  jobPosting: {
    type: String,
    ref: 'JobPosting',
    required: true
  },
  resumeUrl: {
    type: String,
    required: false
  },
  coverMessage: {
    type: String,
    required: false
  },
  dateApplied: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  }
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

export default JobApplication;
