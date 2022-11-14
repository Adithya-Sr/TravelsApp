import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { findUser } from "../database/db.service";
import { signjwt } from "./auth.utils";
import omit from "../../helpers/omit";
import { LoginBody } from "./auth.schema";
export const loginhandler = async (
  req: Request<{}, {}, LoginBody>,
  res: Response
) => {
  const { password, email } = req.body;
  //find user by email
  const user = await findUser(email);
  if (!user || !user.comparePassword(password)) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .send("incorrect emailID or password!!!");
  }

  const payload = omit(user.toJSON(), "password");
  const jwt = signjwt(payload);
  res.cookie("access token", jwt, {
    maxAge: 3.154e10, //1year
    httpOnly: true,
    domain: "localhost", //process.env for production
    path: "/",
    sameSite: "strict",
    secure: false, //on production "true"
  });
  return res.status(StatusCodes.OK).send(jwt);
};
