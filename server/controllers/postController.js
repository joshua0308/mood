const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'joshuakim',
  host: 'localhost',
  database: 'solo-project',
  password: 37740200,
  port: 5432
});

const postController = {
  createPost: (req, res) => {
    const now = new Date();
    const { username, mood, journal_entry } = req.body;
    console.log(username, mood, journal_entry);
    pool.query(
      'insert into posts (created_on, username, mood, journal_entry) values ($1, $2, $3, $4)',
      [now, username, mood, journal_entry],
      (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
      }
    );
  },
  getPosts: (req, res) => {
    pool.query('select * from posts', (err, result) => {
      if (err) throw err;
      res.status(200).json(result.rows);
    });
  }
};

module.exports = postController;
// const db = require('../models/postModel');

// function show(req, res) {
//   db.conn.query('select * from post;', (err, result) => {
//     if (err) console.lerror(err);
//     else res.status(200).send(result);
//   });
// }

// module.exports = { show };
