const databaseData = {
    user: 'gabriele',
    password: 'password',
    host: 'localhost',
    database: 'sudoku.dmi'
};

const databaseInit = async (pool) => {
    try {
        
        await pool.query(`
            CREATE TABLE if not exists user (
                id int(11) NOT NULL PRIMARY KEY,
                email varchar(60) NOT NULL,
                username varchar(32) NOT NULL,
                password varchar(60) NOT NULL,
                creation_date date NOT NULL DEFAULT current_timestamp(),
                points float NOT NULL DEFAULT 0,
                total int(11) NOT NULL DEFAULT 0,
                easy int(11) NOT NULL DEFAULT 0,
                medium int(11) NOT NULL DEFAULT 0,
                hard int(11) NOT NULL DEFAULT 0,
                impossible int(11) NOT NULL DEFAULT 0,
                games_won int(11) NOT NULL DEFAULT 0
            )
        `);

        await pool.query(`
            create table if not exists score (
                id int(11) NOT NULL PRIMARY KEY,
                user_id int(11) NOT NULL,
                score float NOT NULL,
                solving_date date NOT NULL DEFAULT current_timestamp(),
                FOREIGN KEY (user_id) REFERENCES user(id)
            )
        `);

        await pool.query(`
            CREATE TABLE if not exists session (
                token varchar(128) NOT NULL PRIMARY KEY,
                user_id int(11) NOT NULL,
                creation_date datetime NOT NULL DEFAULT current_timestamp(),
                FOREIGN KEY (user_id) REFERENCES user(id)
            )    
        `)

    } catch (err) {
        throw err;
    }
}

module.exports = {databaseData, databaseInit};