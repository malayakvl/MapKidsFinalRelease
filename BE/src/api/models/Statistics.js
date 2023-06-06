import pool from './connect.js';
import { logger } from '../../common/logger.js';

class StatisticsController {
    async addStatisticsData(type) {
        const client = await pool.connect();
        try {
            const query = `INSERT INTO data.statistics (file_type) VALUES ('${type}')`;
            await client.query(query);

            return { success: true };
        } catch (e) {
            console.log('error message', e.message);
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

    async fetchStatisticsData() {
        const client = await pool.connect();
        try {
            const queryPdfWeek = `SELECT COUNT(id) as pdfCount FROM data.statistics WHERE
                            file_type='pdf' AND
                            date_trunc('week', now()) <= statistics.created_at AND
                            statistics.created_at < date_trunc('week', now()) + '1 week'::interval`;
            const resWeekPdf = await client.query(queryPdfWeek);
            const queryPptWeek = `SELECT COUNT(id) as pptCount FROM data.statistics WHERE
                            file_type='ppt' AND
                            date_trunc('week', now()) <= statistics.created_at AND
                            statistics.created_at < date_trunc('week', now()) + '1 week'::interval`;
            const resWeekPpt = await client.query(queryPptWeek);

            const queryPdfMonth = `SELECT COUNT(id) as pdfCount FROM data.statistics WHERE
                            file_type='pdf' AND
                            date_trunc('month', now()) <= statistics.created_at AND
                            statistics.created_at < date_trunc('month', now()) + '1 month'::interval`;
            const resMonthPdf = await client.query(queryPdfMonth);
            const queryPptMonth = `SELECT COUNT(id) as pptCount FROM data.statistics WHERE
                            file_type='ppt' AND
                            date_trunc('month', now()) <= statistics.created_at AND
                            statistics.created_at < date_trunc('month', now()) + '1 month'::interval`;
            const resMonthPpt = await client.query(queryPptMonth);

            const queryPdfYear = `SELECT COUNT(id) as pdfCount FROM data.statistics WHERE
                            file_type='pdf' AND
                            date_trunc('year', now()) <= statistics.created_at AND
                            statistics.created_at < date_trunc('month', now()) + '1 year'::interval`;
            const resYearPdf = await client.query(queryPdfYear);
            const queryPptYear = `SELECT COUNT(id) as pptCount FROM data.statistics WHERE
                            file_type='ppt' AND
                            date_trunc('year', now()) <= statistics.created_at AND
                            statistics.created_at < date_trunc('month', now()) + '1 year'::interval`;
            const resYearPpt = await client.query(queryPptYear);

            const totalPerYearPdf = `SELECT to_char(created_at, 'MM') AS monthStr, count(id) as totalDownload
                                    FROM data.statistics
                                    WHERE 
                                        created_at > date_trunc('month', CURRENT_DATE) - INTERVAL '1 year'
                                        AND file_type='pdf'
                                    GROUP BY 1`;
            const totalYearPdf = await client.query(totalPerYearPdf);

            const totalPerYearPpt = `SELECT to_char(created_at, 'MM') AS monthStr, count(id) as totalDownload
                                    FROM data.statistics
                                    WHERE 
                                        created_at > date_trunc('month', CURRENT_DATE) - INTERVAL '1 year'
                                        AND file_type='ppt'
                                    GROUP BY 1`;
            const totalYearPpt = await client.query(totalPerYearPpt);

            return {
                perWeekDownload: `${resWeekPdf.rows[0].pdfcount}/${resWeekPpt.rows[0].pptcount}`,
                perMonthDownload: `${resMonthPdf.rows[0].pdfcount}/${resMonthPpt.rows[0].pptcount}`,
                perYearDownload: `${resYearPdf.rows[0].pdfcount}/${resYearPpt.rows[0].pptcount}`,
                statsPerYearPdf: totalYearPdf.rows,
                statsPerYearPpt: totalYearPpt.rows
            };
        } catch (e) {
            console.log('error message', e.message);
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

}

export default new StatisticsController();