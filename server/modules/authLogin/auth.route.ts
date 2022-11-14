import express from "express";
import { processRequestBody } from "zod-express-middleware";
import { loginhandler } from "./auth.controller";
import { loginSchema } from "./auth.schema";
const router = express.Router();
router.post("/", processRequestBody(loginSchema.body), loginhandler);
export default router;
