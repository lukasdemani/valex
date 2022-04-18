import cors from "cors";
import express, { json, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import "express-async-errors";
import cardRouter from "./routers/cardRouter";

const app = express();
app.use(json());
app.use(cors());
app.use(cardRouter);
// app.use((error, req: Request, res: Response, next: NextFunction) => {
//   console.log(error);
//   if (error.response) {
//     return res.sendStatus(error.response.status);
//   }

//   res.sendStatus(500);
// });

export default app;