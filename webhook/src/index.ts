import express, { Request, Response } from "express";

const app = express();

export interface WebHook {
	origin: string;
	body: WebHookBody[];
	key: string;
}

export interface WebHookBody {
	"event-name": string;
	data: string;
}

app.get("/webhook", async (req: Request, res: Response) => {
	const data: WebHook = req.body;

	return res.status(200).send("?");
});

app.listen(8080);
