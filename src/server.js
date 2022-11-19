import express, { json, urlencoded } from "express";
import productRouter from "./routes/product.route.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/productos", productRouter);
app.use("/public", express.static(path.join(__dirname + "/html")));

app.listen(8080, (error) => {
  if (error) {
    console.log("Error: " + error);
  } else {
    console.log("Server listening on port 8080");
  }
});
