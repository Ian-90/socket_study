import express from "express";
import { resolve, join } from "path";
import { Server } from "socket.io";
import logger from "morgan";
import socketController from "./socketController";
import events from "./event";

const PORT = 4000;
const __dirname = resolve();
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));

app.get("/", (req, res) =>
  res.render("home", { events: JSON.stringify(events) })
);

const handleListening = () =>
  console.log(`Server is running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = new Server(server);

io.on("connection", (socket) => socketController(socket, io));
