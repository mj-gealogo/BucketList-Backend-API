import {getPool} from "../../config/db";
import {ResultSetHeader} from "mysql2";
import Logger from '../../config/logger';
const viewAll = async (searchQuery: placeSearchQuery): Promise<placeReturn> => {
    Logger.info(`Getting all places from database`);
    const conn = await getPool().getConnection();
    let query = `select id as placeId, name, description FROM Place`;

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
    const query = `select id as placeId, name, description FROM Place WHERE id = ?`;
    const [ rows ] = await conn.query( query, [Cid]);
    await conn.release();
    return rows;
}

const getAllForCountry = async (Cid: number): Promise<place> => {
    Logger.info(`Getting all places for a country from database`);
    const conn = await getPool().getConnection();
    const query = `select p.id as placeId, p.name, p.description FROM Place As p JOIN Country As c ON p.country = c.id WHERE country = ?`;
    const [ rows ] = await conn.query( query, [Cid]);
    await conn.release();
    return rows;
}



export {viewAll, getOne, getAllForCountry};