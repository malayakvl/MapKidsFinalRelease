import pool from './connect.js';
import { logger } from '../../common/logger.js';

class Icon {
    async fileUpload (req, res) {
        // const dirUpload = `${process.env.DOWNLOAD_FOLDER}/logos`;
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, `public/uploads/locationImages`);
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname);
            }
        });
        const upload = multer({ storage: storage }).single('file');
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);
            } else if (err) {
                return res.status(500).json(err);
            }
            const dataUser = {};
            if (req.file) {
                dataUser.file = `/uploads/photos/${req.file.filename}`;
            }
            return res.status(200).json({ success: true });
        });
    }

    async getAll (page, perPage = 20, reqOffset = null) {
        const client = await pool.connect();
        try {
            const _total = await client.query(`SELECT * FROM common__tools._select_total_from_table_by_where('data', 'icons', 'id', null);`);
            const size = _total.rows[0].total;
            // const perPage = 20;
            let offset;
            if (reqOffset) {
                offset = reqOffset;
            } else {
                offset = (Number(page) - 1) * Number(perPage);
            }
            const rowsQuery = `SELECT * FROM data.get_icons_list(${perPage}, ${offset}, '', 'created_at DESC');`;
            const res = await client.query(rowsQuery);
            const items = res.rows.length > 0 ? res.rows : [];
            const error = null;
            return {
                items,
                size,
                error
            };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error (Notifications getAll):',
                    { message: e.message }
                );
            }
            const items = null;
            const error = {
                code: 500,
                message: 'Error get list of images',
                error: e.message
            };
            return {
                items,
                error
            };
        } finally {
            client.release();
        }
    }

    async addPhoto(photo) {
        const client = await pool.connect();
        try {
            await client.query(`INSERT INTO data.icons (name) VALUES ('${photo}')`);
            return {success: true, error: null};
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return {success: false, error: e.message };
        } finally {
            client.release();
        }
    }

    async addPhotos(photos) {
        const client = await pool.connect();
        // console.log('photos data', photos);
        try {
            const promisesQueries = [];
            photos.map(photo => {
                promisesQueries.push(this.addPhoto(photo));
            })
            if (promisesQueries.length) {
                await Promise.all(promisesQueries);
            }

            const success = {
                code: 200,
            };
            return {
                success,
            };
        } catch (e) {
            console.log(e);
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error (Photos upload):',
                    { message: e.message }
                );
            }
            const users = null;
            const error = {
                code: 500,
                message: 'Error get upload photos'
            };
            return {
                users,
                error
            };
        } finally {
            client.release();
        }
    }

    async updateTitle (data) {
        const client = await pool.connect();
        try {
            const title = data.title
            const rowsQuery = `UPDATE data.images SET title='${title}' WHERE id='${data.imageId}';`;
            await client.query(rowsQuery);
            return { success: true,  };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error (Article getAll):',
                    { message: e.message }
                );
            }
            const items = null;
            const error = {
                code: 500,
                message: 'Error get list of articles',
                error: e.message
            };
            return {
                items,
                error
            };
        } finally {
            client.release();
        }
    }


    async findById(id) {
        const client = await pool.connect();
        try {
            const query = `SELECT * FROM data.images WHERE id = ${id}`;
            const res = await client.query(query);
            return res.rows.length ? res.rows[0]: null
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { success: false, error: { code: 404, message: 'Country Not found' } };
        } finally {
            client.release();
        }

    }

    async getGallery(imageIds) {
        const client = await pool.connect();
        try {
            const query = `SELECT * FROM data.images WHERE id IN (${imageIds.join(',')})`;
            const res = await client.query(query);
            return res.rows.length ? res.rows: []
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { success: false, error: { code: 404, message: 'Country Not found' } };
        } finally {
            client.release();
        }

    }


    async deletePhoto (photoId, userId, photo) {
        const SQL = `SELECT * FROM data.icons WHERE id=${photoId}`;
        const client = await pool.connect();
        try {
            const res = await client.query(SQL);
            const productPhotos = res.rows[0].name;
            return true;
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return null;
        } finally {
            client.release();
        }
    }

}

export default new Icon();
