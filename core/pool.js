const util = require('util');
const mysql = require('mysql');
/**
 * Coonection to the database.
 */
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database : 'connect'
});

pool.getConnection((err, connection) => {

    if(err)
       console.error("Something went wrong while connecting to the database ..."); 

    if(connection)
        connection.release();
    return;
});


pool.query = util.promisify(pool.query);

module.exports = pool;