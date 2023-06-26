import Job from '../Model/JobModel.js';
import UserInfo from '../Model/UserInfo.js';
import asyncHandler from 'express-async-handler';

// CREATE job
const createJob = asyncHandler( async (req, res) => {
  try {
    req.body.postedBy = req.UserInfo._id;
    const job = new Job(req.body);

    await job.save();

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ all jobs
// const getJobs = asyncHandler( async (req, res) => {
//   try {
//     const jobs = await Job.find();
//     jobs.forEach(async (job) => {
//       job.postedBy = await UserInfo.findById(job.postedBy).name;
//     });

//     res.status(200).json(jobs);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });



const getJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find();
    const jobPromises = jobs.map(async (job) => {
      const userInfo = await UserInfo.findById(job.postedBy);
      if (userInfo) {
        job.postedBy = userInfo.name;
      } else {
        job.postedBy = "Unknown User";
      }
      return job;
    });
    const jobsWithUserNames = await Promise.all(jobPromises);
    res.status(200).json(jobsWithUserNames);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// READ single job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json(job);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE job
const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Job deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export  {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob
}