import { Request, Response } from "express";

export class ExampleController {
    public getExample(res: Response): void {
        res.json({ message: "This is an example endpoint." });
    }

    public postExample(req: Request, res: Response): void {
        const { data } = req.body;
        res.json({ message: `Received: ${data}` });
    }
}