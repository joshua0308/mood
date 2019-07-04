const pool = require('../models/database');

const postController = {
  createPost: (req, res) => {
    console.log('server => postController => createPost');
    const now = new Date();
    const { username, mood, journal_entry } = req.body;
    pool.query(
      'insert into posts (created_on, username, mood, journal_entry) values ($1, $2, $3, $4)',
      [now, username, mood, journal_entry],
      (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
      }
    );
  },
  getPosts: (req, res) => {
    console.log('server => postController => getPosts');
    pool.query('select * from posts', (err, result) => {
      if (err) throw err;
      return res.status(200).json(result.rows);
    });
  },
  getOnePost: (req, res) => {
    console.log('server => postController => getOnePost');
    pool.query(
      'select * from posts where post_id=$1',
      [req.params.id],
      (err, result) => {
        if (err) throw err;
        return res.status(200).json(result.rows);
      }
    );
  },
  deleteOnePost: (req, res) => {
    console.log('server => postController => deleteOnePost');
    pool.query(
      'delete from posts where post_id=$1',
      [req.params.id],
      (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
      }
    );
  },
  updateOnePost: (req, res) => {
    console.log('server => postController => updateOnePost');
    pool.query(
      'update posts set journal_entry=$1 where post_id=$2',
      [req.body.entry, req.params.id],
      (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
      }
    );
  }
};

module.exports = postController;
