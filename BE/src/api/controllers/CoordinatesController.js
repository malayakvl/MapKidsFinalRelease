// import coordinatesModel from '../models/Coordinates.js';
// import statisticModel from "../models/Statistics.js";
import locationModel from "../models/Location.js";


class CoordinatesController {
    async saveMarker(req, res) {
        let error;
        const testData = [
            {id: 1, title: 'Page 1'},
            {id: 2, title: 'Page 2'}
        ];
        if (testData) res.status(200).json({data: testData});
        if (error) res.status(error.code).json({error: 'Show error message'});
    }

    async fetchMarkers (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await locationModel.fetchMarkers();
            return res.status(200).json({ items: data.items});
        }
    }
}

export default new CoordinatesController();
