import {Express} from "express";
import {rootUrl} from "./base.server.routes";
import * as country from '../controllers/country.server.controller';
import * as place from '../controllers/place.server.controller';
import * as activity from '../controllers/activity.server.controller';
import * as images from '../controllers/images.image.server.controller';

module.exports = (app: Express) => {
    app.route(rootUrl+'/countries')
        .get(country.viewAll);
    app.route(rootUrl+'/countries/:Cid')
        .get(country.getOne);
    app.route(rootUrl+'/places')
        .get(place.viewAll);
    app.route(rootUrl+'/countries/:Cid/places')
        .get(place.getAllForCountry);
    app.route(rootUrl+'/countries/:Cid/places/:Pid')
        .get(place.getOne);
    app.route(rootUrl+'/activities')
        .get(activity.viewAll);
    app.route(rootUrl+'/countries/:Cid/places/:Pid/activities')
        .get(activity.getAllForPlace);
    app.route(rootUrl+'/countries/:Cid/places/:Pid/activities/:Aid')
        .get(activity.getOne);
    app.route(rootUrl+'/films/:id/image')
        .get(images.getImage)
        .put(images.setImage);
}