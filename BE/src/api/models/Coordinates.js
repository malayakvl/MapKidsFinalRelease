import pool from './connect.js';
import { logger } from '../../common/logger.js';


class Coordinates {
    async saveMarker (lat, lng, countryId) {
        const client = await pool.connect();
        try {
            // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            // let result = '';
            // const charactersLength = characters.length;
            // let counter = 0;
            // while (counter < length) {
            //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
            //     counter += 1;
            // }
            const title = `Pointer ${Date.now()}`
            const rowsQuery = `INSERT INTO data.coordinates (title, lat, lng, country) VALUES ('${title}', ${lat}, ${lng}, ${countryId});`;
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

    async getCountryMarkers (countryId) {
        const client = await pool.connect();
        try {
            const rowsQuery = `SELECT * FROM data.coordinates WHERE country=${countryId};`;
            const items = await client.query(rowsQuery);
            return { markers: items.rows };
        } catch (e) {
            console.log(e.message);
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

    async fetchOne(id) {
        const client = await pool.connect();
        try {
            const rowsQuery = `SELECT * FROM data.coordinates WHERE id='${id}';`;
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

    async setMain(id, countryId) {
        const client = await pool.connect();
        try {
            const rowsQuery = `UPDATE data.coordinates SET is_main=false WHERE country='${countryId}';`;
            await client.query(rowsQuery);
            const resQueryUpd = `UPDATE data.coordinates SET is_main=true WHERE id='${id}'`;
            await client.query(resQueryUpd);
            const rowsQueryMarkers = `SELECT * FROM data.coordinates WHERE country=${countryId};`;
            const items = await client.query(rowsQueryMarkers);
            return { markers: items.rows };
            // return {
            //     item,
            //     error
            // };
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
export default new Coordinates();
