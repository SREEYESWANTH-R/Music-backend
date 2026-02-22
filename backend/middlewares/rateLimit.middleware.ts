import { Request, Response, NextFunction } from "express";

export const rateLimitMiddleware = (windowMs: number = 60 * 1000, limit: number = 10) => {
    
    const clients = new Map<string, {count: number, timestamp: number}>();

    return (req: Request, res: Response, next: NextFunction) => {
        const ip = req.ip;
        if(!ip){
            return res.status(400).json({ message: "IP address not found" });
        }
        const client = clients.get(ip);
        
        // Client not found create a new data in map
        if(!client){
            clients.set(ip,{count : 1, timestamp: Date.now()});
            return next();
        }
        
        //If window expires reset the count 
        if(Date.now() - client.timestamp > windowMs){
            clients.set(ip,{count : 1, timestamp: Date.now()});
            return next();
        }

        // If Client found then increment the count
        if(client.count >= limit){
            return res.status(429).json({ message: "Too many requests" });
        }
        clients.set(ip,{count : client.count + 1, timestamp: client.timestamp});
        next();
    }
}