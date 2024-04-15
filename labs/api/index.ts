import express, { Express, Request, Response } from 'express';
import router_films from './film';

const router_api = express.Router();


// router_api.use((req:Request, res:Response, next) => {
//     console.log("Api router:", req.url);
//     next();
// })

router_api.use('/films', router_films);


export default router_api;