import express from 'express';
import {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob
} from '../Controller/JobModel.js';
const router = express.Router();
import  protect  from '../Middleware/Middleware.js';
// CREATE job
router.post('/jobs',protect, createJob);

// READ all jobs
router.get('/jobs',protect, getJobs);

// READ single job by ID
router.get('/jobs/:id',protect, getJobById);

// UPDATE job
router.put('/jobs/:id',protect, updateJob);

// DELETE job
router.delete('/jobs/:id',protect, deleteJob);

export default router;
