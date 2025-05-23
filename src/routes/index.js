import { Router } from 'express';
import authRoutes from './authroutes.js';

const router = Router();

router.use('/auth', authRoutes);

export default router;
