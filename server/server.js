const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const postController = require('./controllers/postController');
const authController = require('./controllers/authController');

// localhost port
const app = express();
const port = 3000;

// create a server instance
const http = require('http').createServer(app);

// create a socket using the server instance
const io = require('socket.io')(http);

// socket listens for connection
io.on('connection', function(socket) {
  console.log('socket.io listening...');
  socket.emit('test', {});
});

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
  authController.verifyJwt,
  (req, res, next) => {
    console.log("server => app.get('/api/posts')");
    next();
  },
  postController.getPosts
);

app.get('/api/posts/:id', authController.verifyJwt, postController.getOnePost);

app.post('/api/posts', authController.verifyJwt, postController.createPost);

app.delete(
  '/api/posts/:id',
  authController.verifyJwt,
  (req, res, next) => {
    console.log("server => app.delete('/api/posts/:id')");
    next();
  },
  postController.deleteOnePost
);

app.put(
  '/api/posts/:id',
  authController.verifyJwt,
  (req, res, next) => {
    console.log("server => app.post('/api/posts/:id')");
    next();
  },
  postController.updateOnePost
);

app.post('/auth/login', authController.verifyUser);
app.post('/auth/logout', authController.removeJwt);
app.post('/auth/create', authController.createUser);
//  (req, res, next) => {
//   res.status(200).send("server.js => app.post('/create/')");}

// listen on port 3000
// app.listen(port, () => console.log(`Listening on port ${port}...`));
http.listen(port, () => console.log(`Listening on port ${port}...`));
