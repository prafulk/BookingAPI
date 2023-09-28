import { ConnectionPool } from 'mssql';

const config = {
    user: 'test',
    password: 'test',
    server: 'test', 
    database: 'test',
};

const poolPromise = new ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL')
        return pool;
    })
    .catch(err => {
        console.log('Database Connection Failed! Bad Config:', err)
    });

/**
 * Query the database using a SQL string and parameters.
 * @param {string} sql - The SQL query string
 * @param {Array} params - Array of parameters for the SQL query
 * @returns {Promise} - A promise that resolves with the query results
 */
const query = async (sql, params = []) => {
    const pool = await poolPromise;
    const request = pool.request();
    params.forEach((param, index) => {
        request.input(index, param);
    });
    return request.query(sql);
}

export { query };
