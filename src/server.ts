import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import "reflect-metadata";
import "./database"

import { router } from './routes';

const app = express();

//indica que valor recebido será JSON
app.use(express.json());

app.use(router);

//middleware que lida com erro
app.use((err: Error, req: Request ,res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }
    
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
}); 

app.listen(3000, () => console.log("Server is running"));