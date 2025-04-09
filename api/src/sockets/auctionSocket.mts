import { Socket } from "socket.io";
import cookie from "cookie";
import Auction from "../models/auctionSchema.mts";

export const auctionSocket = async (socket: Socket, io) => {
  console.log("a user connected", socket.id);

  const cookies = cookie.parse(socket.handshake.headers.cookie || "");
  const loginCookie = cookies.login;

  const auctions = await Auction.find();
  socket.emit("auctionList", auctions);

  socket.on("joinAuction", async (auctionToJoin: string) => {
    socket.join(auctionToJoin);

    const auction = await Auction.findOne({ name: auctionToJoin });
    socket.emit("bids", auction?.bids);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });
};
