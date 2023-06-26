import NGO from '../Model/NGO.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const login =asyncHandler(async (req, res) => {
  
    try {
      // Find NGO by email
      const existingNGO = await NGO.findOne({ email: req.body.email });
      if (!existingNGO) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Check if passcode matches
      const isMatch = await bcrypt.compare(req.body.passcode, existingNGO.passcode);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      // Create and sign JWT token
      const payload = {
        ngo: {
          id: existingNGO.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '20d' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });



// CREATE
const create = ()=> asyncHandler( async (req, res) => {
  try {
    const { name, email, passcode, vision, objective, capital, members } = req.body;

    // Check if the email already exists
    let ngo = await NGO.findOne({ email });
    if (ngo) {
      return res.status(400).json({ msg: 'NGO already exists with that email' });
    }

    ngo = new NGO({
      name,
      email,
      passcode,
      vision,
      objective,
      capital,
      members
    });

    // Hash the password and save the ngo
    const salt = await bcrypt.genSalt(10);
    ngo.passcode = await bcrypt.hash(passcode, salt);

    await ngo.save();

    // Create and return a JWT
    const payload = {
      ngo: {
        id: ngo.id
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '20d' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// READ ALL
const get = ()=> asyncHandler(async (req, res) => {
  try {
    const ngos = await NGO.find();
    res.json(ngos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// READ ONE
const getOne = ()=> asyncHandler(async(req, res) => {
  console.log(req.ngo)
  res.json(req.ngo);
});

// UPDATE
const update = ()=> asyncHandler( async (req, res) => {
  res.ngo= req.ngo;
  if (req.body.name != null) {
    res.ngo.name = req.body.name;
  }
  if (req.body.email != null) {
    res.ngo.email = req.body.email;
  }
  if (req.body.passcode != null) {
    res.ngo.passcode = req.body.passcode;
  }
  if (req.body.members != null) {
    res.ngo.members = req.body.members;
  }
  if (req.body.capital != null) {
    res.ngo.capital = req.body.capital;
  }
  if (req.body.objective != null) {
    res.ngo.objective = req.body.objective;
  }
  if (req.body.vision != null) {
    res.ngo.vision = req.body.vision;
  }
  try {
    const updatedNGO = await res.ngo.save();

    res.json(updatedNGO);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
const deleteNgo = ()=> asyncHandler(async (req, res) => {
  try {
    await res.ngo.remove();
    res.json({ message: 'NGO Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export  {
  create,
  get,
  getOne,
  update,
  deleteNgo,
  login
};

