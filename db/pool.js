const { Pool } = require("pg");

const pool = new Pool({
  connectionString: `postgersql://${process.env.ROLE_NAME}:${process.env.ROLE_PASSWORD}@localhost:${process.env.LOCAL_HOST}/${process.env.DATA_BASE}`,
});

module.exports = pool;
