import {getPool} from "../../config/db";
import Logger from '../../config/logger';
const viewAll = async (searchQuery: countrySearchQuery): Promise<countryReturn> => {
    Logger.info(`Getting all countries from database`);
    const conn = await getPool().getConnection();
    let query = `select id, name, description FROM Country`;

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
    const query = `select id, name, description FROM Country WHERE id = ?`;
    const [ rows ] = await conn.query( query, [id]);
    await conn.release();
    return rows;
}

const getImageFilename = async (id: number): Promise<string> => {
    const query = 'SELECT `image_filename` FROM Country WHERE id = ?';
    const rows = await getPool().query(query, [id]);
    return rows[0].length === 0 ? null : rows[0][0].image_filename;
}

const setImageFilename = async (id: number, filename: string): Promise<void> => {
    const query = "UPDATE Country SET `image_filename`=? WHERE `id`=?";
    await getPool().query(query, [filename, id]);
}

export {viewAll, getOne, getImageFilename, setImageFilename};