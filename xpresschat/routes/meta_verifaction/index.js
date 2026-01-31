import { Router } from "express";
import { exchangeCodeForToken } from './controller/index.js'
const meta_verification = Router();

meta_verification.post(
    '/exchangeCodeForToken',
    exchangeCodeForToken
);

export default meta_verification;
