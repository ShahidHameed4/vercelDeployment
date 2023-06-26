import express from 'express';
import Article from '../Model/ArticleModel.js';
import { Router } from 'express';
import protect from '../Middleware/Middleware.js'

const router = express.Router();
// Get all articles
router.get('/get',protect, async (req, res) => {
  try {
    const articles = await Article.find({ published: true });
    res.json(articles);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Get a single article by ID
router.get('/:id',protect,(req, res) => {
  
    Article.findById(req.params.id)
        .then(article => res.json(article))
        .catch(err => res.status(404).json({ success: false }));

});

// Create a new article
router.post('/create',protect, async (req, res) => {
  const article = new Article({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
    tags: req.body.tags || []
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




// Update an article
router.patch('/update/:id',protect, async (req, res) => {
  if (req.body.title != null) {
    res.article.title = req.body.title;
  }

  if (req.body.body != null) {
    res.article.body = req.body.body;
  }

  if (req.body.author != null) {
    res.article.author = req.body.author;
  }

  if (req.body.tags != null) {
    res.article.tags = req.body.tags;
  }

    try {
        
        const updateArticle = Article.updateOne({ _id: req.params.id }, { $set: { title: req.body.title, body: req.body.body, author: req.body.author, tags: req.body.tags } });
        res.json(updateArticle);

        }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an article
router.delete('/delete/:id',protect, async (req, res) => {
  try {
    Article.deleteOne({ _id: req.params.id });
    res.json({ message: 'Deleted Article' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



export default router;