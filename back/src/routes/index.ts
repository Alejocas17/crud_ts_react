import {Router, Response, Request} from 'express';

const router1 =Router();
router1.get('/api/', (req:Request, res:Response) => {
    res.render('../views/index');
})