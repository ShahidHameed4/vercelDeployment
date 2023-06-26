import express from 'express';
import { createApplicationReview, getApplicationReviewById, getApplicationReviews, updateApplicationReview } from '../Controller/AppReview.js';
const router = express.Router();


// Create a new application review
router.post('/', async (req, res) => {
  const { employerId, jobApplicationId, reviewMessage } = req.body;
  try {
    const savedReview = await createApplicationReview(employerId, jobApplicationId, reviewMessage);
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all application reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await getApplicationReviews();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get application review by ID
router.get('/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  try {
    const review = await getApplicationReviewById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update application review
router.patch('/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  const { reviewMessage, status } = req.body;
  try {
    const updatedReview = await updateApplicationReview(reviewId, reviewMessage, status);
    if (!updatedReview) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete application review
router.delete('/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  try {
    const deletedReview = await deleteApplicationReview(reviewId);
    if (!deletedReview) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json(deletedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
