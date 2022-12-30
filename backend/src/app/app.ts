import * as dotenv from 'dotenv';
import express from 'express';
import router from './router';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json())

app.use(router)

app.listen(PORT, () => 'Server running on port 5000');