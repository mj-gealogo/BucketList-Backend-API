import {getPool} from "../../config/db";
import {ResultSetHeader} from "mysql2";
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



export {viewAll, getOne, getAllForPlace};