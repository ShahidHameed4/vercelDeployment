import Advocacy from '../Model/Adovocacy.js';
import Transaction from '../Model/Transactions.js';
import NGO from '../Model/NGO.js';


// Create a new advocacy campaign
const createAdvocacy = async (req, res) => {
  try {


    // Generate a random 6-digit number for the ID field
    let id = Math.floor(100000 + Math.random() * 900000);

    // Check if the generated ID already exists in the database
    let result = await Transaction.findOne({ id: id });
    while (result) {
      id = Math.floor(100000 + Math.random() * 900000);
      result = await Transaction.findOne({ id: id });
    }

    // Get the current balance of the NGO
    const existingNGO = await NGO.findOne({ _id:req.ngo.id });
    if (!existingNGO) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }
    var balance=0;
    if(req.body.type!='spending'){
        balance = parseInt(existingNGO.capital) + parseInt(req.body.Amount);
     }
     else{
        balance = parseInt(existingNGO.capital) - parseInt(req.body.Amount);
     }
    if (balance < 0) {
      res.status(501).json({ error: "Not enough balance" });
      return;
    }

    existingNGO.capital = balance;
    const savedNGO = await existingNGO.save();
    let date2 = new Date();
    date2 = date2.getDate() + "/" + date2.getMonth() + "/" + date2.getFullYear()+"  "+date2.getHours() +":"+date2.getMinutes()+":"+date2.getSeconds();

    // Create a new transaction with the generated ID and the passed data
    const transaction = new Transaction({
      id: id,
      department: "Operations",
      type: "spending",
      amount: req.body.Amount,
      date: date2,
      teamleadId: req.body.teamleadId,
      status: req.body.status,
      ngoId: req.ngo.id,
    });
    const savedTransaction = await transaction.save();




    const advocacy = await Advocacy.create(
        {
            id: id,
            title: req.body.title,
            type: req.body.type,
            ngoId: req.ngo.id,
            teamleadId: req.body.teamleadId,
            status: req.body.status,
            amount: req.body.Amount,
            date: date2,
            audience: req.body.Audience,
            campaignType: req.body.campaignType,
            balance: balance,
        }
    );



    res.status(201).json(advocacy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all advocacy campaigns
const getAdvocacies = async (req, res) => {
  try {
    const advocacies = await Advocacy.find({ngoId: req.ngo.id});
    res.status(200).json(advocacies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single advocacy campaign by id
const getAdvocacyById = async (req, res) => {
  try {
    const advocacy = await Advocacy.findById(req.params.id);
    if (!advocacy) throw new Error('Advocacy not found');
    res.status(200).json(advocacy);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update an existing advocacy campaign by id
const updateAdvocacy = async (req, res) => {
  try {
    const advocacy = await Advocacy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!advocacy) throw new Error('Advocacy not found');
    res.status(200).json(advocacy);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Delete an advocacy campaign by id
const deleteAdvocacy = async (req, res) => {
  try {
    const advocacy = await Advocacy.findByIdAndDelete(req.params.id);
    if (!advocacy) throw new Error('Advocacy not found');
    res.status(200).json({ message: 'Advocacy deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export { createAdvocacy, getAdvocacies, getAdvocacyById, updateAdvocacy, deleteAdvocacy };
