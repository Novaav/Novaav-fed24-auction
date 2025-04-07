import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.get("/", (req, res) => {
  res.send("Auktion");
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    credentials: true,
    origin: true,
  },
});

server.listen(port, () => {
  console.log(`Servern kör på http://localhost:${port}`);
});
