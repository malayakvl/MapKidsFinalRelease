import pool from './connect.js';
import { logger } from '../../common/logger.js';


/**
 * Settings model
 */
class Settings {
    async getSettingsData() {
        const client = await pool.connect();
        try {
            const query = 'SELECT * FROM data.settings WHERE id=1';
            const res = await client.query(query);
            if (res.rows[0]) {
                return res.rows[0];
            }

        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Settings error:',
                    { message: e.message }
                );
            }
            throw new Error(e);
        } finally {
            client.release();
        }
    }

    async updateSettingsData(data) {
        const client = await pool.connect();
        try {
            await client.query(
                `UPDATE data.settings SET 
                    email_notification='${data.email_notification}',
                    count_per_page='${data.count_per_page}'
                 WHERE id=1
                `);
            return { success: true };
        } catch (e) {
            console.log('error message', e.message);
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Update settings error:',
                    { message: e.message }
                );
            }
            throw new Error(e);
        } finally {
            client.release();
        }
    }
}

export default new Settings();
