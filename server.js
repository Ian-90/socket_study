import express from "express";
import { resolve, join } from "path";

const PORT = 4000;
const __dirname = resolve();
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));

app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
  console.log(`Server is running: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
