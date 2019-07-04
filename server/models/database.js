const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'joshuakim',
  host: 'localhost',
  database: 'solo-project',
  password: 37740200,
  port: 5432
});

module.exports = pool;
