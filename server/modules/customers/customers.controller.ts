import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { findPackages } from "../database/db.service";
import logger from "../../utils/logger";

async function getPackages(req: Request, res: Response) {
  try {
    const packages = await findPackages();
    return res.status(StatusCodes.OK).send(packages);
  } catch (e) {
    logger.error(e);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("couldn't find packages");
  }
}
export default getPackages;
