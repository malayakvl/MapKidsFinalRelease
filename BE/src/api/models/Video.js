import pool from './connect.js';
import { logger } from '../../common/logger.js';

class Video {
    async getAll (page, perPage = 20, reqOffset = null) {
        const client = await pool.connect();
        try {
            const _total = await client.query(`SELECT * FROM common__tools._select_total_from_table_by_where('data', 'articles', 'id', null);`);
            const size = _total.rows[0].total;
            let offset;
            if (reqOffset) {
                offset = reqOffset;
            } else {
                offset = (Number(page) - 1) * Number(perPage);
            }
            const rowsQuery = `SELECT * FROM data.get_articles_list(${perPage}, ${offset}, '', 'created_at DESC');`;
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

    async create(req, res) {
        const client = await pool.connect();
        try {
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error (Video greate):',
                    { message: e.message }
                );
            }
        } finally {
            client.release();
        }
    }
}


export default new Video();
