import {getPool} from "../../config/db";
import Logger from '../../config/logger';
const viewAll = async (searchQuery: activitySearchQuery): Promise<activityReturn> => {
    Logger.info(`Getting all activities from database`);
    const conn = await getPool().getConnection();
    let query = `select a.id, a.name, a.description, c.name as country, p.name as place, c.id as cid, p.id as pid FROM Activity AS a JOIN Place AS p ON a.place = p.id JOIN Country AS c ON p.country = c.id`;

    if (searchQuery.q) {
        query += ` WHERE a.name LIKE '%${searchQuery.q}%'`;
    }
    query += ` ORDER by a.name`
    if (searchQuery.count && searchQuery.startIndex) {
        query += ` LIMIT ${searchQuery.count} OFFSET ${searchQuery.startIndex}`;
    }
    const [ rows ] = await conn.query( query , []);
    await conn.release();
    return rows;
};

const getOne = async (Aid: number): Promise<activity> => {
    Logger.info(`Getting one activity from database`);
    const conn = await getPool().getConnection();
    const query = `select a.id, a.name, a.description, c.name as country, p.name as place, c.id as cid, p.id as pid FROM Activity AS a JOIN Place AS p ON a.place = p.id JOIN Country AS c ON p.country = c.id WHERE a.id = ?`;
    const [ rows ] = await conn.query( query, [Aid]);
    await conn.release();
    const activity = rows.length === 0 ? null : rows[0];
    return activity;
}

const getAllForPlace = async (Cid: number, Pid: number): Promise<activity> => {
    Logger.info(`Getting all activities for a country from database`);
    const conn = await getPool().getConnection();
    const query = `select a.id, a.name, a.description, c.name as country, p.name as place, c.id as cid, p.id as pid FROM Activity AS a JOIN Place AS p On a.place = p.id JOIN Country AS c on p.country = c.id WHERE c.id = ? AND p.id = ?`;
    const [ rows ] = await conn.query( query, [Cid, Pid]);
    await conn.release();
    return rows;
}

const getImageFilename = async (id: number): Promise<string> => {
    const query = 'SELECT `image_filename` FROM Activity WHERE id = ?';
    const rows = await getPool().query(query, [id]);
    return rows[0].length === 0 ? null : rows[0][0].image_filename;
}

const setImageFilename = async (id: number, filename: string): Promise<void> => {
    const query = "UPDATE Activity SET `image_filename`=? WHERE `id`=?";
    await getPool().query(query, [filename, id]);
}



export {viewAll, getOne, getAllForPlace, getImageFilename, setImageFilename};