import pool from './connect.js';
import { logger } from '../../common/logger.js';

class Video {
    async getAll (page, perPage = 20, reqOffset = null) {
        const client = await pool.connect();
        try {
            const _total = await client.query(`SELECT * FROM common__tools._select_total_from_table_by_where('data', 'videos', 'id', null);`);
            const size = _total.rows[0].total;
            let offset;
            if (reqOffset) {
                offset = reqOffset;
            } else {
                offset = (Number(page) - 1) * Number(perPage);
            }
            const rowsQuery = `SELECT * FROM data.get_videos_list(${perPage}, ${offset}, '', 'created_at DESC');`;
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
                    'Model error (Video getAll):',
                    { message: e.message }
                );
            }
            const items = null;
            const error = {
                code: 500,
                message: 'Error get list of videos',
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

    async create(data) {
        const client = await pool.connect();
        try {
            // const _resProd = await client.query(`SELECT * FROM data.products WHERE id=${dataProduct.id} AND user_id=${userId}`);
            const queryUpdate = `
                INSERT INTO data.videos (code) 
                VALUES (
                    $$${data.code}$$
                 );`;
            await client.query(queryUpdate);
            return { success: true };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { success: false, error: { code: 404, message: 'Addresses Not found' } };
        } finally {
            client.release();
        }
    }

    async findById(id) {
        const client = await pool.connect();
        try {
            const query = `SELECT * FROM data.videos WHERE id = ${id}`;
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
            const query = `SELECT * FROM data.videos WHERE id IN (${imageIds.join(',')})`;
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


}


export default new Video();
