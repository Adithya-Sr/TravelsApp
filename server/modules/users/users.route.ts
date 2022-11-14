import express from "express";
import { processRequestBody } from "zod-express-middleware";
import { registerUserHandler } from "./users.controller";
import { registerUsersSchema } from "./users.schema";
import requireUser from "../../middlewares/requireUser";
const router = express.Router();

router.get("/", requireUser, (req, res) => {
  return res.send(res.locals.user);
});
router.post(
  "/",
  processRequestBody(registerUsersSchema.body),
  registerUserHandler
);
export default router;
