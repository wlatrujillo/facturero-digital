import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    //Try to validate the token and get data
    try {
        let token = <string>req.headers["authorization"];
        if (token)
            token = token.split(' ')[1];
        else {
            res.status(403).send("Not token found");
            return;
        }
        let jwtPayload = <any>jwt.verify(token, process.env.SECRET || '');
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send(error);
        return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    /*const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, process.env.SECRET||'', {
      expiresIn: "1h"
    });
    res.setHeader("token", newToken);*/

    //Call the next middleware or controller

    next();
};
