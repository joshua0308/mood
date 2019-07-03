const express = require('express');
const path = require('path');
const postController = require('./controllers/postController');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cookieParser());

// if we are using web-dev-server, build file is available in memory rather than file system
// running web-dev-server does its own build in memory instead of the file system
// therefore, it does not need the local build folder and we don't need port 3000 to serve html file
// we need port 3000 only for database interactions
if (process.env.NODE_ENV !== 'development') {
  // serves bundle.js when index.html looks for bundle.js
  app.use('/build', express.static(path.join(__dirname, '../build')));

  // serve the html file
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}

app.get(
  '/api/posts',
  (req, res, next) => {
    console.log('/api/posts endpoint');
    next();
  },
  postController.getPosts
);

app.post('/api/posts', postController.createPost);

// listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));
