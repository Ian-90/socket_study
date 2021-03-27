import express from "express";
import { resolve, join } from "path";
import { Server } from "socket.io";
import logger from "morgan";

const PORT = 4000;
const __dirname = resolve();
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));

app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
  console.log(`Server is running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("newMessage", ({ message }) => {
    socket.broadcast.emit("messageNotif", {
      message,
      nickname: socket.nickname || "Anon",
    });
  });

  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });
});
