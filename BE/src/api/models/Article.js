import pool from './connect.js';
import { logger } from '../../common/logger.js';
// import fs from "fs";

class Article {
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
            const rowsQuery = `SELECT * FROM data.articles WHERE id='${id}';`;
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

    async create (dataItem) {
        const client = await pool.connect();
        try {
            // const _resProd = await client.query(`SELECT * FROM data.products WHERE id=${dataProduct.id} AND user_id=${userId}`);
            const queryUpdate = `
                INSERT INTO data.articles (title, article_text, active) 
                VALUES (
                    $$${dataItem.title}$$,
                    $$${dataItem.article_text}$$,
                    true
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


    async update (dataItem) {
        const client = await pool.connect();
        try {
            // const _resProd = await client.query(`SELECT * FROM data.products WHERE id=${dataProduct.id} AND user_id=${userId}`);
            const queryUpdate = `
                UPDATE data.articles
                SET
                    title = $$${dataItem.title}$$,
                    article_text = $$${dataItem.article_text}$$
                 WHERE id=${dataItem.id};`;
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

}


export default new Article();
