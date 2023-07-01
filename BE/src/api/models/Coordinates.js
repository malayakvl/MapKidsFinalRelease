import pool from './connect.js';
import { logger } from '../../common/logger.js';


class Coordinates {
    async saveMarker (lat, lng, countryId) {
        const client = await pool.connect();
        try {
            const rowsQuery = `INSERT INTO data.coordinates (lat, lng, country) VALUES (${lat}, ${lng}, ${countryId});`;
            console.log(rowsQuery);
            await client.query(rowsQuery);
            return { success: true };
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

    async getCountryMarkers (countryId) {
        const client = await pool.connect();
        try {
            const rowsQuery = `SELECT * FROM data.coordinates WHERE country=${countryId};`;
            console.log(rowsQuery);
            const items = await client.query(rowsQuery);
            return { markers: items };
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

}
export default new Coordinates();
