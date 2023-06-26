import express from 'express';
import { createJobApplication, getJobApplications, getJobApplicationById } from '../Controller/JobApplicationController.js';

const router = express.Router();


// Create a new job application
router.post('/', async (req, res) => {
  const { applicant, jobPosting, coverMessage } = req.body;
  let file = req.files.file;
        let asd =req.files.asd
        file.mv(".\\public\\uploads\\" + file.name, (err)=>{
            res.send(err)
        })
        resumeUrl=".\\public\\uploads\\" + file.name;
  try {
    const jobApplication = await createJobApplication(applicant, jobPosting, resumeUrl, coverMessage);
    res.status(201).json(jobApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create job application' });
  }
});

// Get all job applications
router.get('/', async (req, res) => {
  try {
    const jobApplications = await getJobApplications();
    res.status(200).json(jobApplications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get job applications' });
  }
});

// Get job application by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const jobApplication = await getJobApplicationById(id);
    res.status(200).json(jobApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get job application' });
  }
});

// Update job application
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const jobApplication = await updateJobApplication(id, updates);
    res.status(200).json(jobApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update job application' });
  }
});

// Delete job application
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const jobApplication = await deleteJobApplication(id);
    res.status(200).json(jobApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete job application' });
  }
});

export default router;