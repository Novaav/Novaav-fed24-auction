import { Socket } from "socket.io";
import cookie from "cookie";
import Auction from "../models/auctionSchema.mts";
import jwt from "jsonwebtoken";
import { UserDto } from "../models/userDto.mts";

export const auctionSocket = async (socket: Socket, io) => {
  console.log("a user connected", socket.id);


  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const loginCookie = cookies.login;

    if (loginCookie) {
      const decodedUser = jwt.decode(loginCookie) as UserDto;
      if (decodedUser) {
        console.log("User decoded from cookie:", decodedUser)
        socket.emit("userConnected", decodedUser);
      }
    }
  } catch (error) {
    console.error("Error decoding cookie:", error);
  }



  const auctions = await Auction.find();
  socket.emit("auctionList", auctions);

  socket.on("joinAuction", async (auctionToJoin: string) => {
    console.log("User joined auction:", auctionToJoin);
    socket.join(auctionToJoin);


    const auction = await Auction.findOne({ title: auctionToJoin });
    socket.emit("bids", auction?.bids);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });
};
