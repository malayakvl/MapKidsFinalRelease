import videoModel from '../models/Image.js';

class VideoController {
    async fetchItems (req, res) {
        console.log('Fetching items');
        const { limit, offset, queryFilter, column, sort } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await videoModel.getAll(1, limit, offset);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }

    async addVideo(req, res) {
        const { limit, offset, queryFilter, column, sort } = req.query;
    }
}

export default new VideoController();
