import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";
import swaggetUi from "swagger-ui-express";

import swaggerFile from "../../../swagger.json";

import "reflect-metadata";

import "../../container";
import { router } from "./routes";
import createConnection from "../typeorm"
import { AppError } from "../../errors/AppError";

createConnection();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggetUi.serve, swaggetUi.setup(swaggerFile));
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
})

export { app }