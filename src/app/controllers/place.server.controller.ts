import {Request, Response} from "express";
import Logger from "../../config/logger";
import * as Place from "../models/place.model";
import * as schemas from "../resources/schemas.json";
import {validate} from "../services/validator";

const viewAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = await validate(schemas.place_search, req.query);
        if (validation !== true) {
            res.statusMessage = `Bad Request: ${validation.toString()}`;
            res.status(400).send();
            return;
        }
        if (req.query.hasOwnProperty("startIndex"))
            req.query.startIndex = parseInt(req.query.startIndex as string, 10) as any;
        if (req.query.hasOwnProperty("count"))
            req.query.count = parseInt(req.query.count as string, 10) as any;

        let search: placeSearchQuery = {
            q: '',
            startIndex: 0,
            count: -1,
        }
        search = {...search, ...req.query} as placeSearchQuery;

        const places = await Place.viewAll(search);
        res.status(200).send(places);
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
        const placeId = parseInt(req.params.Pid, 10);
        if (isNaN(placeId)) {
            res.statusMessage = "Id must be an integer"
            res.status(400).send();
            return;
        }
        const country = await Place.getOne(placeId);
        if (country !== null) {
            res.status(200).send(country);
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

const getAllForCountry = async (req: Request, res: Response): Promise<void> => {
    try {
        const countryId = parseInt(req.params.Cid, 10);
        if (isNaN(countryId)) {
            res.statusMessage = "Id must be an integer"
            res.status(400).send();
            return;
        }
        const places = await Place.getAllForCountry(countryId);
        if (places !== null) {
            res.status(200).send(places);
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

export {viewAll, getOne, getAllForCountry};