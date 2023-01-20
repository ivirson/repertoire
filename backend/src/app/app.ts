import * as dotenv from "dotenv";

dotenv.config();

import express from "express";
import database from "./database/db";
import router from "./router";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

database.sync();

app.use(router);

app.listen(PORT, () => `Server running on port ${PORT}`);
