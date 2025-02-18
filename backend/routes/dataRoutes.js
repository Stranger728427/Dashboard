import express from 'express';
import { getAllData, getDataById } from '../controllers/dataController.js';

const router = express.Router();

router.get('/', getAllData);
router.get('/:id', getDataById);

export default router;
