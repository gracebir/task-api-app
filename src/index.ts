import express, { Request, Response } from "express";
import dotenv from 'dotenv'
import routerTask from "./routes/task.route";
import routerAuth from "./routes/user.route"

dotenv.config()

const app = express();

app.use(express.json())
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("task list");
});

app.use('/api/task', routerTask)
app.use('/api/auth', routerAuth)

app.listen(port, () => {
  console.log(`server start on ${port}..`);
});
