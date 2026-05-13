const sql = require('mssql');

const config = require('./dbconfig');

let pool = null;

async function getPool() {
    if (!pool) {
        pool = await sql.connect(config);
        console.log('Connected to SQL Server');
    }
    return pool;
}

module.exports = { getPool, sql };
