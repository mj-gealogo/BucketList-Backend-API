import {Request, Response} from "express";
import Logger from "../../config/logger";
import * as Country from "../models/country.model";
import {addImage, getImageExtension, readImage, removeImage} from "../models/image.model";


const getImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const countryId = parseInt(req.params.Cid, 10);
        if (isNaN(countryId)) {
            res.statusMessage = "Id must be an integer"
            res.status(400).send();
            return;
        }
        const filename = await Country.getImageFilename(countryId)
        if(filename == null) {
            res.status(404).send();
            return;
        }
        const [image, mimetype]  = await readImage(filename)
        res.status(200).contentType(mimetype).send(image)
    } catch (err) {
        Logger.error(err);
        res.statusMessage = "Internal Server Error";
        res.status(500).send();
    }
}

const setImage = async (req: Request, res: Response): Promise<void> => {
    try{
        const countryId = parseInt(req.params.Cid, 10);
        if (isNaN(countryId)) {
            res.statusMessage = "Id must be an integer"
            res.status(400).send();
            return;
        }
        const image = req.body;
        const country = await Country.getOne(countryId);
        if (country == null){
            res.statusMessage = "No such country"
            res.status(404).send();
        }
        const mimeType = req.header('Content-Type');
        const fileExt = getImageExtension(mimeType);
        if (fileExt === null) {
            res.statusMessage = 'Bad Request: photo must be image/jpeg, image/png, image/gif type, but it was: ' + mimeType;
            res.status(400).send();
            return;
        }

        if (image.length === undefined) {
            res.statusMessage = 'Bad request: empty image';
            res.status(400).send();
            return;
        }

        const filename = await Country.getImageFilename(countryId);
        if(filename != null && filename !== "") {
            await removeImage(filename);
        }
        const newFilename = await addImage(image, fileExt);
        await Country.setImageFilename(countryId, newFilename);
        res.status(200).send()
    } catch (err) {
        Logger.error(err)
        res.statusMessage = "Internal Server Error";
        res.status(500).send();
        return;
    }
}


export {getImage, setImage};