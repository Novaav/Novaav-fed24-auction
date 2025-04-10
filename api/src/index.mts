import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { auctionSocket } from "./sockets/auctionSocket.mjs";
import cookieParser from "cookie-parser";
import { logInRouter } from "./routes/loginroute.mts";
import { auth } from "./middlewares/auth.mts";
import mongoose from "mongoose";
import dotenv from "dotenv";
import registerRouter from "./routes/registerroute.mts";
import auctionRouter from "./routes/auctionroute.mts";


dotenv.config();

const app = express();
const port = 3000;
const DB = process.env.DB_URL || "mongodb://localhost:27017/auctionDB";

app.use("/auctions", auctionRouter);
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());

app.get("/ping", (_, res) => {
  res.status(200).send("Api is working");
});

// Rutter för login och register
app.use("/login", logInRouter);
app.use("/register", registerRouter); // Ingen auth här, så att registrering fungerar utan autentisering

// Använd auth-middleware för rutter som kräver autentisering (t.ex. efter login)
app.use(auth); // Auth-middleware ska appliceras efter login/register-rutter

// Starta servern och anslut till databasen
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

server.listen(port, async () => {
  console.log(`Servern kör på http://localhost:${port}`);

  try {
    if (!DB) {
      throw new Error("Missing environment variable DB_URL");
    }
    await mongoose.connect(`${DB}`);
    console.log("Api is up and running, connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
});
