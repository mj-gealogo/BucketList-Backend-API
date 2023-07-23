import {getPool} from "../../config/db";
import {ResultSetHeader} from "mysql2";
import Logger from '../../config/logger';
const viewAll = async (searchQuery: countrySearchQuery): Promise<countryReturn> => {
    Logger.info(`Getting all countries from database`);
    const conn = await getPool().getConnection();
    let query = `select id as countryId, name, description FROM Country`;

    if (searchQuery.q) {
        query += `WHERE name LIKE '%${searchQuery.q}%'`;
    }
    const [ rows ] = await conn.query( query );
    await conn.release();
    return rows;
};

const getOne = async (id: number): Promise<country> => {
    Logger.info(`Getting one country from database`);
    const conn = await getPool().getConnection();
    const query = `select country.id as countryId, name, description FROM Country WHERE id = ?`;
    const [ rows ] = await conn.query( query, [id]);
    await conn.release();
    return rows;
}



export {viewAll, getOne};