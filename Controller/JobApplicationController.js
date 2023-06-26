import JobApplication from '../Model/JobApplication.js';

const createJobApplication = async (applicant, jobPosting, resumeUrl, coverMessage) => {
    try {
        
      const jobApplication = await JobApplication.create({
        applicant,
        jobPosting,
        resumeUrl,
        coverMessage
      });
      return jobApplication;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create job application');
    }
  };

  const getJobApplications = async () => {
    try {
      const jobApplications = await JobApplication.find().populate('applicant').populate('jobPosting');
      return jobApplications;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get job applications');
    }
  };
  
  const getJobApplicationById = async (id) => {
    try {
      const jobApplication = await JobApplication.findById(id).populate('applicant').populate('jobPosting');
      return jobApplication;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get job application');
    }
  };
  const updateJobApplication = async (id, updates) => {
    try {
      const jobApplication = await JobApplication.findByIdAndUpdate(id, updates, { new: true });
      return jobApplication;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update job application');
    }
  };
  const deleteJobApplication = async (id) => {
    try {
      const jobApplication = await JobApplication.findByIdAndDelete(id);
      return jobApplication;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete job application');
    }
  };
 
    export  {
        createJobApplication,
        getJobApplications,
        getJobApplicationById,
        updateJobApplication,
        deleteJobApplication
        
    }