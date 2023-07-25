import pool from './connect.js';
import { logger } from '../../common/logger.js';

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
            const rowsQuery = `SELECT * FROM data.get_countries_list(${perPage}, ${offset}, '', 'active ASC, name ASC');`;
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
    async activeItems () {
        const client = await pool.connect();
        try {
            // const _total = await client.query(`SELECT id FROM common__tools._select_total_from_table_by_where('data', 'countries', 'id', null);`);
            // const size = _total.rows[0].total;
            // let offset;
            // if (reqOffset) {
            //     offset = reqOffset;
            // } else {
            //     offset = (Number(page) - 1) * Number(perPage);
            // }
            const rowsQuery = `SELECT * FROM data.countries WHERE active=true ORDER BY name;`;
            const res = await client.query(rowsQuery);
            const items = res.rows.length > 0 ? res.rows : [];
            const error = null;
            return {
                items,
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
            const rowsQueryMarkers = `SELECT * FROM data.coordinates WHERE country='${id}';`;
            const resMarkers = await client.query(rowsQueryMarkers);
            item.markers = resMarkers.rows.length > 0 ? resMarkers.rows : [];
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

    async updateRecord(data, id, markerId) {
        const client = await pool.connect();
        try {
            // const rowsQuery = `UPDATE data.coordinates SET
            //     images='${JSON.stringify(data.images)}',
            //     videos='${JSON.stringify(data.videos)}',
            //     fill_color='${data.fillColor ? data.fillColor : ''}',
            //     fill_opacity='${data.fillOpacity ? data.fillOpacity : ''}',
            //     description=$$${data.description}$$
            //     WHERE id='${markerId}'`;
            const rowsQuery = `UPDATE data.coordinates SET 
                images=${data.newImageIds.length > 0 ? JSON.stringify(data.newImageIds) : null},
                videos=${data.newVideoIds.length > 0 ? JSON.stringify(data.newVideoIds) : null},
                icon='${data.icon ? data.icon.icon.replace(process.env.API_URL, '') : ''}'
                WHERE id='${markerId}'`;
            await client.query(rowsQuery);
            if (data.title) {
                const rowsQueryTitle = `UPDATE data.coordinates SET
                    title=$$${data.title}$$
                    WHERE id='${markerId}'`;
                await client.query(rowsQueryTitle);
            }
            if (data.description) {
                const rowsQueryDescr = `UPDATE data.coordinates SET
                    description=$$${data.description}$$
                    WHERE id='${markerId}'`;
                await client.query(rowsQueryDescr);
            }

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
    async removeMarker(id, countryId) {
        const client = await pool.connect();
        try {
            const rowsQuery = `DELETE FROM data.coordinates WHERE id='${id}'`;
            await client.query(rowsQuery);

            // const res = await client.query(`SELECT * FROM data.coordinates WHERE country='${countryId}'`);
            // const item = res.rows.length > 0 ? res.rows[0] : {};
            const error = null;
            return {
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

    async updateOpacity(opacity, id) {
        const client = await pool.connect();
        try {
            const rowsQuery = `UPDATE data.countries SET 
                fill_opacity='${opacity ? opacity : ''}'
                WHERE id='${id}'`;
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
    async updateColor(color, id) {
        const client = await pool.connect();
        try {
            const rowsQuery = `UPDATE data.countries SET 
                fill_color='${color ? `#${color}` : ''}'
                WHERE id='${id}'`;
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
    async fetchMarkers () {
        const client = await pool.connect();
        try {
            // const rowsQuery = `SELECT * FROM data.coordinates;`;
            // const rowsQuery = `SELECT * FROM data.coordinates LEFT JOIN data.countries ON data.countries.id = data.coordinates.country;`;
            const rowsQuery = `SELECT data.coordinates.*, data.countries.flag_name
                        FROM data.coordinates LEFT JOIN data.countries ON data.countries.id = data.coordinates.country;`;
            const res = await client.query(rowsQuery);
            const items = res.rows.length > 0 ? res.rows : [];
            const error = null;
            return {
                items,
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
}

export default new Location();
