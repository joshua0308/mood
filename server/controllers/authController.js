const pool = require('../models/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SALT_WORK_FACTOR = 10;
const jwtPrivateKey = 'jwtPrivateKey';

const authController = {
  createUser: (req, res, next) => {
    console.log('server => authController => createUser', req.body);
    let { username, password } = req.body;
    let created_on = new Date();

    // hash the password
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      console.log('bcrypt.genSalt');
      if (err) return next(err);
      bcrypt.hash(password, salt, function(err, hash) {
        console.log('bcrypt.hash');
        if (err)
          return res.status(401).json({ error: 'Bcrypt - Invalid password' });
        password = hash;

        // insert account into user database
        pool.query(
          'insert into users (username, password, created_on) values ($1, $2, $3)',
          [username, password, created_on],
          (err, result) => {
            console.log('pool.query');
            if (err)
              return res
                .status(401)
                .json({ error: 'Create - Invalid username or password' });
            return res.status(200).json(result);
          }
        );
      });
    });
  },

  verifyUser: (req, res, next) => {
    let { username, password } = req.body;
    // find the user
    pool.query(
      'select * from users where username=$1',
      [username],
      (err, result) => {
        console.log('pool.query');
        if (err)
          return res
            .status(401)
            .json({ error: 'Verify - Invalid username or password.' });
        console.log(result.rows[0]);

        // if user exists, check the password
        if (result.rows[0]) {
          let user = result.rows[0];

          bcrypt.compare(password, user.password, function(err, isMatch) {
            // if password is correct, need to generate json web token and save it to client's cookie
            if (isMatch === true) {
              const jwtToken = jwt.sign(
                { user_id: user.user_id, username: user.username },
                jwtPrivateKey
              );

              // set the jwtToken in client's cookie
              res.cookie('jwtToken', jwtToken);
              res.status(200).json({
                message: 'jwtToken stored in cookies',
                user_id: user.user_id
              });
            } else res.status(200).json({ error: 'Verify - Wrong password' });
          });
        } else res.status(401).json({ error: 'Verify - Username not found' });
      }
    );
  },

  verifyJwt: (req, res, next) => {
    if (req.cookies.jwtToken) {
      jwt.verify(req.cookies.jwtToken, jwtPrivateKey, function(err, decoded) {
        if (err) {
          console.error(err);
          return res.status(401).json({ error: 'Invalid jwtToken' });
        }
        console.log('authController => verifyJwt => decoded', decoded);
        res.locals.decoded = decoded;
        next();
      });
    } else {
      return res.status(401).json({ error: 'jwtToken not found' });
    }
  }
};

module.exports = authController;
