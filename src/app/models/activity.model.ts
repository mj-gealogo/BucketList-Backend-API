import {getPool} from "../../config/db";
import Logger from '../../config/logger';
const viewAll = async (searchQuery: activitySearchQuery): Promise<activityReturn> => {
    Logger.info(`Getting all activities from database`);
    const conn = await getPool().getConnection();
    let query = `select id as activityId, name, description FROM Activity`;

    if (searchQuery.q) {
        query += `WHERE name LIKE '%${searchQuery.q}%'`;
    }
    const [ rows ] = await conn.query( query , []);
    await conn.release();
    return rows;
};

const getOne = async (Aid: number): Promise<activity> => {
    Logger.info(`Getting one activity from database`);
    const conn = await getPool().getConnection();
    const query = `select id as activityId, name, description FROM Activity WHERE id = ?`;
    const [ rows ] = await conn.query( query, [Aid]);
    await conn.release();
    return rows;
}

const getAllForPlace = async (Cid: number, Pid: number): Promise<activity> => {
    Logger.info(`Getting all activities for a country from database`);
    const conn = await getPool().getConnection();
    const query = `select a.id as activityId, a.name, a.description FROM Activity AS a JOIN Place AS p On a.place = p.id JOIN Country AS c on p.country = c.id WHERE c.id = ? AND p.id = ?`;
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