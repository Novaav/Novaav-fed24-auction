import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { auctionSocket } from "./sockets/auctionSocket.mjs";
import cookieParser from "cookie-parser";
import { logInRouter } from "./routes/loginroute.mts";


const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());

app.use("/login", logInRouter);

app.get("/ping", (_, res) => {
  res.status(200).send("Api is working");
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    credentials: true,
    origin: true,
  },
});

io.on("connection", async (socket) => {
  auctionSocket(socket, io);
});

server.listen(port, () => {
  console.log(`Servern kör på http://localhost:${port}`);
});
