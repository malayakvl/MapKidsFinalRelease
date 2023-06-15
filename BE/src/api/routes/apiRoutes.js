import * as express from 'express';
// import TestController from '../controllers/TestController.js';
// import DashboardController from '../controllers/DashboardController.js';
import ImageController from '../controllers/ImageController.js';
import ArticleController from '../controllers/ArticleController.js';
import VideoController from '../controllers/VideoController.js';
import UserController from '../controllers/UserController.js';
import SettingsController from '../controllers/SettingsController.js';
import LocationController from "../controllers/LocationController.js";
import userModel from '../models/User.js';

const apiRoutes = express.Router();

apiRoutes.use(express.json({
    inflate: true,
    limit: '512kb',
    strict: true
}));


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
apiRoutes.get('/countries/active-item', LocationController.activeItem);
apiRoutes.get('/countries/unactive-item', LocationController.unactiveItem);
apiRoutes.get('/countries/fetch-item/:id', LocationController.fetchItem);
apiRoutes.post('/countries/update-item', LocationController.updateItem);

/** ===================================================================== */
/** ================== IMAGES ROUTES ==================================== */
/** ===================================================================== */
apiRoutes.get('/images/fetch-items', ImageController.fetchItems);
apiRoutes.get('/images/fetch-all-items', ImageController.fetchAllItems);
// apiRoutes.post('/images/bulk-delete', ImageController.bulkDelete);
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
