import express from 'express'
import { doctorLogin, doctorsList } from '../Controllers/doctorController.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorsList);
doctorRouter.post('/login', doctorLogin);

export default doctorRouter;           