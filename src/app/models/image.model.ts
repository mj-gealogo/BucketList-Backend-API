import {fs} from "mz";
import Logger from "../../config/logger";
import crypto from "crypto";

const filepath = './storage/images/';
const readImage = async (fileName: string) : Promise<[Buffer, string]> => {
    const image = await fs.readFile(filepath + fileName);
    const mimeType = getImageMimetype(fileName);
    return [image, mimeType];
}

const removeImage = async (filename: string): Promise<void> => {
    if(filename) {
        if (await fs.exists(filepath + filename)) {
            await fs.unlink(filepath + filename);
        }
    }
}

const addImage = async (image:any, fileExt: string): Promise<string> => {
    const filename = crypto.randomBytes(16).toString("hex") + fileExt;

    try {
        await fs.writeFile(filepath + filename, image);
        return filename;
    } catch (err) {
        Logger.error(err);
        fs.unlink(filepath + filename).catch(err => Logger.error(err));
        throw err;
    }
}

const getImageMimetype = (filename: string): string => {
    if (filename.endsWith('.jpeg') || filename.endsWith('.jpg')) return 'image/jpeg';
    if (filename.endsWith('.png')) return 'image/png';
    if (filename.endsWith('.gif')) return 'image/gif';
    return 'application/octet-stream';
}

const getImageExtension = (mimeType: string): string => {
    switch (mimeType) {
        case 'image/jpeg':
            return '.jpeg';
        case 'image/png':
            return '.png';
        case 'image/gif':
            return '.gif';
        default:
            return null;
    }
};

export {readImage, removeImage, addImage, getImageExtension};