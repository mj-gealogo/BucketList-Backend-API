import {Express} from "express";
import {rootUrl} from "./base.server.routes";
import * as country from '../controllers/country.server.controller';
import * as place from '../controllers/place.server.controller';
import * as activity from '../controllers/activity.server.controller';
import * as images from '../controllers/images.image.server.controller';

module.exports = (app: Express) => {
    app.route(rootUrl+'/countries')
        .get(country.viewAll);
    app.route(rootUrl+'/countries/:id')
        .get(country.getOne);
    app.route(rootUrl+'/countries/:id/places')
        .get(place.viewAll);
    app.route(rootUrl+'/countries/:id/places/:id')
        .get(place.getOne);
    app.route(rootUrl+'/countries/:id/places/:id/activities')
        .get(activity.viewAll);
    app.route(rootUrl+'/countries/:id/places/:id/activities/:id')
        .get(activity.getOne);
    app.route(rootUrl+'/films/:id/image')
        .get(images.getImage)
        .put(images.setImage);
}