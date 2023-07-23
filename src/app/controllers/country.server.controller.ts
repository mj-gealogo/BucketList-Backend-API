import {Request, Response} from "express";
import Logger from "../../config/logger";
import * as Country from "../models/country.model";
import * as schemas from "../resources/schemas.json";
import {validate} from "../services/validator";

const viewAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = await validate(schemas.country_search, req.query);
        if (validation !== true) {
            res.statusMessage = `Bad Request: ${validation.toString()}`;
            res.status(400).send();
            return;
        }
        if (req.query.hasOwnProperty("startIndex"))
            req.query.startIndex = parseInt(req.query.startIndex as string, 10) as any;
        if (req.query.hasOwnProperty("count"))
            req.query.count = parseInt(req.query.count as string, 10) as any;

        let search: countrySearchQuery = {
            q: '',
            startIndex: 0,
            count: -1,
        }
        search = {...search, ...req.query} as countrySearchQuery;

        const countries = await Country.viewAll(search);
        res.status(200).send(countries);
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
        const countryId = parseInt(req.params.Cid, 10);
        if (isNaN(countryId)) {
            res.statusMessage = "Id must be an integer"
            res.status(400).send();
            return;
        }
        const country = await Country.getOne(countryId);
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

export {viewAll, getOne};