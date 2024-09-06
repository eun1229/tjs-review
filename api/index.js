const express = require('express');
const cors = require('cors');
const app = express();
const Post = require('./models/post');
const User = require('./models/user');
const Review = require('./models/review');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);
const secret = "akljfhljhfihw";

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect("IN GITIGNORE");

app.post('/register', async (req, res) => {
  const {username, password} = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch(e) {
    res.status(400).json(e);
  }
});

app.post('/login', async (req, res) => {
  const {username, password} = req.body;
  const userDoc = await User.findOne({username});
  if (!userDoc) {
    res.status(400).json("user does not exist");
  } else {
    const passwordCorrect = bcrypt.compareSync(password, userDoc.password);
    if (passwordCorrect) {
      jwt.sign({username, id: userDoc._id}, secret, {}, (err, token) => {
        if (err) throw err;
        token.httpOnly = true;
        res.cookie('token', token).json({
          id: userDoc._id,
          username,
        });
      });
    }
    else {
      res.status(400).json("incorrect password or username");
    }
  }
});

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      throw err;
    } else {
      res.json(info);
    }
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
});

app.post('/create', upload.single('files'), async (req, res) => {
  const {originalname, path} = req.file;
  const parts = originalname.split('.');
  const extension = parts[parts.length-1];
  const newPath = path+'.'+extension
  fs.renameSync(path, newPath);

  const {token} = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      throw err;
    } else {
      const{title, summary, review, productimage, city, productstate, reviewcontents, rating} = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        review,
        productimage: newPath, 
        author: info.id
      });
      const postRev = await Review.create({
        rating: rating,
        reviewcontents: reviewcontents, 
        city: city,
        productstate: productstate,
        username: info.id,
        product: postDoc.id
      });
      res.json(postDoc);
    }
  });
});

app.post('/addreview/:id', async (req, res) => {
  const {token} = req.cookies;
  const {id} = req.params
  jwt.verify(token, secret, {}, async (err, info) => {
    const postUser = await User.findById(info.id);
    if (err) {
      throw err;
    } else {
      res.send(req.body);
      try {const reviewDoc = await Review.create({
        rating: req.body.rating,
        reviewcontents: req.body.reviewcontents, 
        city: req.body.city,
        productstate: req.body.productstate,
        username: info.id,
        product: id
      });
      // res.json(reviewDoc);
    }catch (e) {
      res.status(400).json(e);
    }
    }
  });
});

app.get('/post', async (req, res) => {
  res.json(await Post.find()
  .populate('author', ['username'])
  .sort({createdAt: -1})
  .limit(15)
  );
})

app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
})

app.get('/reviews/:id', async (req, res) => {
  const {id} = req.params;
  res.json(await Review.find({product: id})
  .populate('username', ['username'])
  .sort({createdAt: -1})
  .limit(15)
  );
})

app.listen(4000);
