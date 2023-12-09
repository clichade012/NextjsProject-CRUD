const Pool = require('pg').Pool
const pool = new Pool({
  user: 'awspsql365',
  host: 'ls-b140345c9436973515c2b6c5f62dcce1461132e5.cpx6jo0kdcfo.ap-southeast-1.rds.amazonaws.com',
  database: 'Todo',
  password: ']p8nqm9hPD68FbBO;wk52zYSG4#o2Fw^',
  port: 5432
});
module.exports = pool;