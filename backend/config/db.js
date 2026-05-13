const sql = require('mssql');

const config = require('./dbconfig');

let pool = null;

// async function connectandquery(){
//     try {
//         let pool = await sql.connect(config);
//         let result = await pool.request().query('select * from students');
//         console.log(result);
//     } catch(error){
//         console.log('error is :', error);
//     }finally {
//         await sql.close();
//     }
// }

// connectandquery();

async function getPool() {
    if (!pool) {
        pool = await sql.connect(config);
        console.log('Connected to SQL Server');
    }
    return pool;
}

module.exports = { getPool, sql };
