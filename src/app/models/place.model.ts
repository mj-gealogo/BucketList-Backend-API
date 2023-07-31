import {getPool} from "../../config/db";
import Logger from '../../config/logger';
const viewAll = async (searchQuery: placeSearchQuery): Promise<placeReturn> => {
    Logger.info(`Getting all places from database`);
    const conn = await getPool().getConnection();
    let query = `select p.id, p.name, p.description, c.name as country FROM Place AS p JOIN Country AS c ON p.country = c.id`;

    if (searchQuery.q) {
        query += `WHERE name LIKE '%${searchQuery.q}%'`;
    }
    const [ rows ] = await conn.query( query , []);
    await conn.release();
    return rows;
};

const getOne = async (Cid: number): Promise<place> => {
    Logger.info(`Getting one place from database`);
    const conn = await getPool().getConnection();
    const query = `select p.id, p.name, p.description, c.name as country FROM Place as p JOIN Country AS c ON p.country = c.id WHERE p.id = ?`;
    const [ rows ] = await conn.query( query, [Cid]);
    await conn.release();
    const place = rows.length === 0 ? null : rows[0];
    return place;
}

const getAllForCountry = async (Cid: number): Promise<any> => {
    Logger.info(`Getting all places for a country from database`);
    const conn = await getPool().getConnection();
    const query = `select p.id, p.name, p.description, c.name as country FROM Place As p JOIN Country As c ON p.country = c.id WHERE country = ?`;
    const [ rows ] = await conn.query( query, [Cid]);
    await conn.release();
    return rows;
}

const getImageFilename = async (id: number): Promise<string> => {
    const query = 'SELECT `image_filename` FROM Place WHERE id = ?';
    const rows = await getPool().query(query, [id]);
    return rows[0].length === 0 ? null : rows[0][0].image_filename;
}

const setImageFilename = async (id: number, filename: string): Promise<void> => {
    const query = "UPDATE Place SET `image_filename`=? WHERE `id`=?";
    await getPool().query(query, [filename, id]);
}


export {viewAll, getOne, getAllForCountry, getImageFilename, setImageFilename};