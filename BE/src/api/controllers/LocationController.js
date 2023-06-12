import multer from 'multer';
import fs from "fs";
import locationModel from '../models/Location.js';

class LocationController {
    async fetchItems (req, res) {
        const { limit, offset, queryFilter, column, sort } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await locationModel.getAll(1, limit, offset);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }

    async activeItem (req, res) {
        const { id } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await locationModel.activeAction(id, 2);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }

    async unactiveItem (req, res) {
        const { id } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await locationModel.activeAction(id, 2);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }


    async editItem (req, res) {
        const { id } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await locationModel.activeAction(id, 2);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }
}

export default new LocationController();
