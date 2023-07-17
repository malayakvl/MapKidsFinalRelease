import * as express from 'express';
// import TestController from '../controllers/TestController.js';
// import DashboardController from '../controllers/DashboardController.js';
import ImageController from '../controllers/ImageController.js';
import ArticleController from '../controllers/ArticleController.js';
import VideoController from '../controllers/VideoController.js';
import UserController from '../controllers/UserController.js';
import SettingsController from '../controllers/SettingsController.js';
import LocationController from "../controllers/LocationController.js";
import CoordinatesController from "../controllers/CoordinatesController.js";
import userModel from '../models/User.js';
// import Coordinates from "../models/Coordinates.js";

const apiRoutes = express.Router();

apiRoutes.use(express.json({
    inflate: true,
    limit: '512kb',
    strict: true
}));
apiRoutes.get('/countries/fetch-active', LocationController.activeItems);

apiRoutes.post('/countries/add-marker', LocationController.addMarker);
apiRoutes.get('/countries/add-marker', LocationController.addMarker);
apiRoutes.get('/markers/list', CoordinatesController.activeMarkers);
apiRoutes.get('/markers/fetch-item/:id', CoordinatesController.fetchItem);
apiRoutes.get('/markers/set-main/:id', CoordinatesController.setMainMarker);
apiRoutes.post('/countries/add-marker', LocationController.addMarker);
// apiRoutes.get('/countries/update-opacity', LocationController.updateOpacity);
// apiRoutes.post('/countries/update-opacity', LocationController.updateOpacity);



/** ===================================================================== */
/** ================== AUTHENTIFICATED ROUTES =========================== */
/** ===================================================================== */
apiRoutes.use(async (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const decodedJsonObjectString = Buffer.from(bearer[1], 'base64').toString('ascii');
        const decodedJsonObject = decodedJsonObjectString.split(':');
        req.user = await userModel.findUserByEmail(decodedJsonObject[0]);
        next();
    } else {
        res.status(401).json({ code: 401, message: 'Do not have permissions' });
        next();
    }
});
apiRoutes.get('/settings/fetch-item', SettingsController.getSettingsData);
apiRoutes.post('/settings', SettingsController.submitSettingsData);
/** ===================================================================== */
/** ================== VIDEOS ROUTES ===  =============================== */
/** ===================================================================== */
apiRoutes.get('/countries/fetch-items', LocationController.fetchItems);
apiRoutes.get('/countries/unactive-item', LocationController.unactiveItem);
apiRoutes.get('/countries/fetch-item/:id', LocationController.fetchItem);
apiRoutes.post('/countries/update-item', LocationController.updateItem);
apiRoutes.get('/countries/add-pointer', LocationController.addMarker);
apiRoutes.post('/countries/add-pointer', LocationController.addMarker);
apiRoutes.get('/countries/update-opacity', LocationController.updateOpacity);
apiRoutes.post('/countries/update-opacity', LocationController.updateOpacity);
apiRoutes.get('/countries/update-color', LocationController.updateColor);
apiRoutes.post('/countries/update-color', LocationController.updateColor);
apiRoutes.post('/countries/remove-marker', LocationController.removeMarker);
apiRoutes.get('/countries/set-main/:id/:countryId', CoordinatesController.setMainMarker);


/** ===================================================================== */
/** ================== IMAGES ROUTES ==================================== */
/** ===================================================================== */
apiRoutes.get('/images/fetch-items', ImageController.fetchItems);
apiRoutes.get('/images/fetch-all-items', ImageController.fetchAllItems);
apiRoutes.post('/images/update-title', ImageController.updateTitle);
apiRoutes.post('/images/upload-photos', ImageController.uploadImages);

/** ===================================================================== */
/** ================== ARTICLES ROUTES ================================== */
/** ===================================================================== */
apiRoutes.get('/articles/fetch-items', ArticleController.fetchItems);
apiRoutes.get('/articles/fetch-item/:id', ArticleController.fetchItem);
apiRoutes.post('/articles/edit-item', ArticleController.editItem);
apiRoutes.route('/articles/delete/:id').delete(ArticleController.deleteRow);
// apiRoutes.post('/articles/bulk-delete', ArticleController.bulkDelete);

/** ===================================================================== */
/** ================== VIDEOS ROUTES ==================================== */
/** ===================================================================== */
apiRoutes.get('/videos/fetch-items', VideoController.fetchItems);
apiRoutes.post('/videos/save-item', VideoController.addVideo);
apiRoutes.get('/videos/fetch-all-items', VideoController.fetchAllItems);


apiRoutes.route('/profile')
    .post(UserController.changePassword)
    .get(UserController.getProfile);


apiRoutes.get('/*', defaultHandler);

export default apiRoutes;

// Default handler for unknown routes
function defaultHandler(req, res) {
    res.status(404).send('Unknown API endpoint');
}
