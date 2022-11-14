import { connectDB, disconnectDB } from "./utils/DBconnection";
import logger from "./utils/logger";
import cookieParser from "cookie-parser";

import cors from "cors";
import { CORS_ORIGIN } from "./constants";
import helmet from "helmet";
import express from "express";
import deserializeUser from "./middlewares/deserializeUser";
import userRoute from "./modules/users/users.route";
import authRoute from "./modules/authLogin/auth.route";
import agentsRoute from "./modules/agents/agents.route";
import customerRoute from "./modules/customers/customers.route";
const app = express();
const port = process.env.PORT || "4000";

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true, //
  })
);
app.use(helmet());
app.use(deserializeUser);
app.use("/api/users", userRoute);
app.use("/api/login", authRoute);
app.use("/api/agents", agentsRoute);
app.use("/api/customer", customerRoute);
const server = app.listen(port, async () => {
  await connectDB();
  logger.info("listening at port", port);
});
function gracefulShutDown(signal: string) {
  process.on(signal, async () => {
    await disconnectDB();
    server.close();
    logger.info("exiting the server with signal:", signal);
    process.exit(0);
  });
}
const signals = ["SIGINT", "SIGTERM"];
for (let i = 0; i < signals.length; i++) {
  gracefulShutDown(signals[i]);
}
