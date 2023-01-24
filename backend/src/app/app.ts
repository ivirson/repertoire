import * as dotenv from "dotenv";
import express from "express";
import swaggerJSDoc, { Options, SwaggerDefinition } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import database from "./database/db";
import router from "./router";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

database.sync();

app.use(router);

const swaggerDefinition: SwaggerDefinition = {
  info: {
    title: "Repertoire",
    version: "1.0.00",
    description: "API Documentation for Repertoire project",
  },
  components: {
    schemas: require("./schemas.json"),
  },
};

const options: Options = {
  swaggerDefinition,
  apis: ["./modules/**/routes/*.routes.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => `Server running on port ${PORT}`);
