import express from 'express';
import {
  createAdvocacy,
  getAdvocacies,
  getAdvocacyById,
  updateAdvocacy,
  deleteAdvocacy
} from '../Controller/Adovocacy.js';
import NgoMiddleware from '../Middleware/NgoMiddleware.js';

const router = express.Router();

// Create a new advocacy campaign
router.post('/create',NgoMiddleware, createAdvocacy);

// Get all advocacy campaigns
router.get('/get',NgoMiddleware, getAdvocacies);

// Get a single advocacy campaign by id
router.get('/:id', getAdvocacyById);

// Update an existing advocacy campaign by id
router.put('/:id', updateAdvocacy);

// Delete an advocacy campaign by id
router.delete('/:id', deleteAdvocacy);

export default router;
