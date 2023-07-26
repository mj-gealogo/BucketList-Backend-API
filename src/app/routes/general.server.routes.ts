import {Express} from "express";
import {rootUrl} from "./base.server.routes";
import * as country from '../controllers/country.server.controller';
import * as place from '../controllers/place.server.controller';
import * as activity from '../controllers/activity.server.controller';
import * as countryImage from '../controllers/country.image.server.controller'
import * as placeImage from '../controllers/place.image.server.controller';
import * as activityImage from '../controllers/activity.image.server.controller';


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
    app.route(rootUrl+'/countries/:Cid/image')
        .get(countryImage.getImage)
        .put(countryImage.setImage);
    app.route(rootUrl+'/places/:Pid/image')
        .get(placeImage.getImage)
        .put(placeImage.setImage);
    app.route(rootUrl+'/activities/:Aid/image')
        .get(activityImage.getImage)
        .put(activityImage.setImage);
}