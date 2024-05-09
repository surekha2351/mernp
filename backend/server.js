// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas Connection Tfe1gwAatunVGrSp
const dbURI = "mongodb+srv://yarrabattisurekha3260:Tfe1gwAatunVGrSp@cluster0.jkrhkes.mongodb.net/mernp";
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch(err => {
  console.error("Error connecting to MongoDB Atlas:", err);
});

// Book Model
const Book = mongoose.model('Book', {
  title: String,
  author: String,
  year: Number
});

// Routes
app.get('/api/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.post('/api/books', async (req, res) => {
  const { title, author, year } = req.body;
  const book = new Book({ title, author, year });
  await book.save();
  res.json(book);
});

app.put('/api/books/:id', async (req, res) => {
  const { title, author, year } = req.body;
  const book = await Book.findByIdAndUpdate(req.params.id, { title, author, year }, { new: true });
  res.json(book);
});

app.delete('/api/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted successfully' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
