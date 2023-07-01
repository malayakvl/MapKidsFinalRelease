import coordinatesModel from '../models/Coordinates.js';
import statisticModel from "../models/Statistics.js";


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

}
