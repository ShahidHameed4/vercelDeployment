import express from 'express';
import {
  createOperation,
  getAllOperations,
  getOperationById,
  updateOperationById,
  deleteOperationById,
} from '../Controller/Finance.js';
import protect from '../Middleware/NgoMiddleware.js';

const router = express.Router();

// Create a new finance operation
router.post('/create',protect, async (req, res) => {
  try {
    req.body.ngoId=req.ngo.id;
    const operation = await createOperation(req.body);
    res.status(201).json(operation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating finance operation' });
  }
});

// Retrieve all finance operations
router.get('/get',protect, async (req, res) => {
  try {
    const operations = await getAllOperations(req.ngo.id);
    res.json(operations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving finance operations' });
  }
});

// Retrieve a finance operation by ID
router.get('/:id', async (req, res) => {
  try {
    const operation = await getOperationById(req.params.id);
    if (!operation) {
      res.status(404).json({ error: `Finance operation with ID ${req.params.id} not found` });
    } else {
      res.json(operation);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error retrieving finance operation with ID ${req.params.id}` });
  }
});

// Update a finance operation by ID
router.put('/:id', async (req, res) => {
  try {
    const operation = await updateOperationById(req.params.id, req.body);
    if (!operation) {
      res.status(404).json({ error: `Finance operation with ID ${req.params.id} not found` });
    } else {
      res.json(operation);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error updating finance operation with ID ${req.params.id}` });
  }
});

// Delete a finance operation by ID
router.delete('/:id', async (req, res) => {
  try {
    const operation = await deleteOperationById(req.params.id);
    if (!operation) {
      res.status(404).json({ error: `Finance operation with ID ${req.params.id} not found` });
    } else {
      res.json(operation);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error deleting finance operation with ID ${req.params.id}` });
  }
});

export default router;
