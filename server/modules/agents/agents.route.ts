import express from "express";
import { processRequestBody } from "zod-express-middleware";
import AgentHandler from "./agents.controller";
import { registerPackageSchema } from "./agents.schema";
import multer from "multer";
const upload = multer({ dest: "../../utils/files/" });
const router = express.Router();
router.post(
  "/",

  processRequestBody(registerPackageSchema.body),
  upload.single("packageImage"),
  AgentHandler
);
export default router;
