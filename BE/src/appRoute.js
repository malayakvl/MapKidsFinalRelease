import { Router } from 'express';
import pool from './api/models/connect.js';

const appRoute = Router();
appRoute.get(/.*$/, function (req, res, next) {
    pool.query('SELECT 1 + 1  AS solution', (error) => {
        if (error) {
            console.log(error);
            res.render('pages/db-connect', { title: 'No DB connection' });
        } else {
            next();
        }
    });
});

appRoute.get('/', (req, res) => {
    res.render('pages/index', { title: 'Home' });
});

export default appRoute;
