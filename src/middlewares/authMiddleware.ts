import {NextFunction, Request, Response} from 'express';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    req['startAt'] = new Date().toISOString();
    const token = req.header("X") ?? "true";
    if(!token){
        return res.status(401).send("Unauthorized")
    }
    next()
}

export default authMiddleware;