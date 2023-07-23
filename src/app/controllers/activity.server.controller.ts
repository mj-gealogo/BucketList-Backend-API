import {Request, Response} from "express";
import Logger from "../../config/logger";
import * as Activity from "../models/activity.model";
import * as schemas from "../resources/schemas.json";
import {validate} from "../services/validator";

const viewAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = await validate(schemas.activity_search, req.query);
        if (validation !== true) {
            res.statusMessage = `Bad Request: ${validation.toString()}`;
            res.status(400).send();
            return;
        }
        if (req.query.hasOwnProperty("startIndex"))
            req.query.startIndex = parseInt(req.query.startIndex as string, 10) as any;
        if (req.query.hasOwnProperty("count"))
            req.query.count = parseInt(req.query.count as string, 10) as any;

        let search: activitySearchQuery = {
            q: '',
            startIndex: 0,
            count: -1,
        }
        search = {...search, ...req.query} as activitySearchQuery;

        const activities = await Activity.viewAll(search);
        res.status(200).send(activities);
        return;
    } catch (err) {
        Logger.error(err);
        res.statusMessage = "Internal Server Error";
        res.status(500).send();
        return;
    }
};

const getOne = async (req: Request, res: Response): Promise<void> => {
    try {
        const activityId = parseInt(req.params.Aid, 10);
        if (isNaN(activityId)) {
            res.statusMessage = "Id must be an integer"
            res.status(400).send();
            return;
        }
        const activity = await Activity.getOne(activityId);
        if (activity !== null) {
            res.status(200).send(activity);
            return;
        } else {
            res.status(404).send();
            return;
        }
    } catch (err) {
        Logger.error(err);
        res.statusMessage = "Internal Server Error";
        res.status(500).send();
    }
}

const getAllForPlace = async (req: Request, res: Response): Promise<void> => {
    try {
        const countryId = parseInt(req.params.Cid, 10);
        const placeId = parseInt(req.params.Pid, 10);
        if (isNaN(placeId) || isNaN(countryId)) {
            res.statusMessage = "Id must be an integer"
            res.status(400).send();
            return;
        }
        const activity = await Activity.getAllForPlace(countryId, placeId);
        if (activity !== null) {
            res.status(200).send(activity);
            return;
        } else {
            res.status(404).send();
            return;
        }
    } catch (err) {
        Logger.error(err);
        res.statusMessage = "Internal Server Error";
        res.status(500).send();
    }
}

export {viewAll, getOne, getAllForPlace};