import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../../utils/logger";
import { createPackage } from "../database/db.service";
import { registerPackageBody } from "./agents.schema";

async function AgentHandler(
  req: Request<{}, {}, registerPackageBody>,
  res: Response
) {
  try {
    const {
      companyName,
      contactEmail,
      contactNo,
      packageName,
      packageDesc,

      packageCost,
    } = req.body;
    await createPackage({
      companyName,
      contactEmail,
      contactNo,
      packageName,
      packageDesc,

      packageCost,
    });
    return res.status(StatusCodes.CREATED).send("package registered!!!");
  } catch (e) {
    logger.error("package creation error", e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
export default AgentHandler;
