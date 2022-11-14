import express from "express";
import getPackages from "./customers.controller";
const router = express.Router();
router.get("/", getPackages);
export default router;
