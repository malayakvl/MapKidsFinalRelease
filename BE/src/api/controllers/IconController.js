import pool from '../models/connect.js';
import iconModel from '../models/Icon.js';
import multer from 'multer';
import fs from "fs";

class IconController {
    async fetchItems (req, res) {
        const { limit, offset, queryFilter, column, sort } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await iconModel.getAll(1, limit, offset, queryFilter, column, sort);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }

    async fetchAllItems (req, res) {
        const client = await pool.connect();
        // const { limit, offset, queryFilter, column, sort } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await iconModel.getAll(1, 1000000, 0, null, null, null);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }

    async updateTitle (req, res) {
        const { data } = req.params;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await iconModel.updateTitle(req.body.data);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }

    async uploadImages(req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        }
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                // cb(null, `public/uploads/products/${req.user.id}`);
                // cb(null, './public/uploads/tmp');
                cb(null, `${process.env.DOWNLOAD_FOLDER}/photos`);
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname);
            }
        });
        const upload = multer({ storage: storage }).any('photos');

        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);
            } else if (err) {
                return res.status(500).json(err);
            }
            // const dataProduct = req.body;
            const photos = [];
            if (req.files.length > 0) {
                req.files.forEach(file => {
                    photos.push(file.filename);
                });
            }
            await iconModel.addPhotos(photos);


            return res.status(200).json({ success: true });
        });
    }
    async deletePhoto (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        }
        await iconModel.deletePhoto(req.params.id, req.user.id, req.body.data);
        // delete photo
        // fs.unlink(`${process.env.DOWNLOAD_FOLDER}/${req.body.data.replace('/uploads', '')}`,function(err){
        //     if(err) return console.log(err);
        // });
        // fs.unlinkSync(`public/${req.body.data}`);
        return res.status(200).json({ success: true });
    }
}

export default new IconController();