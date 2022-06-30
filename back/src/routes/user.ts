import { Router } from "express";
import { getUser,getUsers,putUser,deleteUser,postUser } from "../controller/user";
const router = Router();

router.get('/view/',      getUsers);
router.get('/view/:id',   getUser);
router.post('/add/',    postUser);
router.put('/edit/:id',   putUser);
router.delete('/del/:id',   deleteUser);


export default router;