import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { createUser } from "../database/db.service";
import { RegisterUserBody } from "./users.schema";

export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserBody>,
  res: Response
) {
  try {
    const { email, username, password } = req.body;
    await createUser({ email, username, password });
    return res.status(StatusCodes.CREATED).send("user registered!!!");
  } catch (e) {
    if (e.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send("user already exists");
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
