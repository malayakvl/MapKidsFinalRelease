import pool from './connect.js';
import { logger } from '../../common/logger.js';
import {setTimeout} from "timers/promises";

class Location {
    async getAll (page, perPage = 20, reqOffset = null) {
        const client = await pool.connect();
        try {
            const _total = await client.query(`SELECT * FROM common__tools._select_total_from_table_by_where('data', 'countries', 'id', null);`);
            const size = _total.rows[0].total;
            let offset;
            if (reqOffset) {
                offset = reqOffset;
            } else {
                offset = (Number(page) - 1) * Number(perPage);
            }
            const rowsQuery = `SELECT * FROM data.get_countries_list(${perPage}, ${offset}, '', 'active ASC');`;
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
                    'Model error (Location getAll):',
                    { message: e.message }
                );
            }
            const items = null;
            const error = {
                code: 500,
                message: 'Error get list of _countries',
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

    async activeAction (id, type) {
        const client = await pool.connect();
        try {
            await client.query(`UPDATE data.countries SET active=${type == 1 ?  false : true};`);
            const size = _total.rows[0].total;
            let offset;
            if (reqOffset) {
                offset = reqOffset;
            } else {
                offset = (Number(page) - 1) * Number(perPage);
            }
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
                    'Model error (Location Active/Unactive Action):',
                    { message: e.message }
                );
            }
            const error = {
                code: 500,
                message: 'Error active/unactive country',
                error: e.message
            };
            return {
                error
            };
        } finally {
            client.release();
        }
    }

    async fetchOne(id) {
        const client = await pool.connect();
        try {
            const rowsQuery = `SELECT * FROM data.countries WHERE id='${id}';`;
            const res = await client.query(rowsQuery);
            const item = res.rows.length > 0 ? res.rows[0] : {};
            const error = null;
            return {
                item,
                error
            };
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

    async updateRecord(data, id) {
        const client = await pool.connect();
        try {
            const rowsQuery = `UPDATE data.countries SET 
                images='${JSON.stringify(data.images)}',
                videos='${JSON.stringify(data.videos)}',
                fill_color='${data.fillColor ? data.fillColor : ''}',
                fill_opacity='${data.fillOpacity ? data.fillOpacity : ''}',
                description=$$${data.description}$$
                WHERE id='${id}'`;
            console.log(rowsQuery);
            await client.query(rowsQuery);

            const res = await client.query(`SELECT * FROM data.countries WHERE id='${id}'`);
            const item = res.rows.length > 0 ? res.rows[0] : {};
            const error = null;
            return {
                item,
                error
            };
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
}

export default new Location();
