import videoModel from '../models/Video.js';
import pool from "../models/connect.js";

class VideoController {
    async fetchItems (req, res) {
        const { limit, offset, queryFilter, column, sort } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await videoModel.getAll(1, limit, offset);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }

    async fetchAllItems (req, res) {
        const client = await pool.connect();
        // const { limit, offset, queryFilter, column, sort } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await videoModel.getAll(1, 1000000, 0, null, null, null);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }


    async fetchAllItems (req, res) {
        const client = await pool.connect();
        // const { limit, offset, queryFilter, column, sort } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await videoModel.getAll(1, 1000000, 0, null, null, null);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }

    async addVideo(req, res) {
        const dataItem = req.body;
        await videoModel.create(dataItem);
        return res.status(200).json({ success: true });
    }
}

export default new VideoController();
