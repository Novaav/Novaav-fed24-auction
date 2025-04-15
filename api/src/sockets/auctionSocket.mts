import { Socket } from "socket.io";
import cookie from "cookie";
import Auction from "../models/auctionSchema.mts";
import jwt from "jsonwebtoken";
import { UserDto } from "../models/userDto.mts";

export const auctionSocket = async (socket: Socket, io) => {
  console.log("a user connected", socket.id);

  // Check if the user is logged in by checking the cookie
  // and emit the user information if available
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const loginCookie = cookies.login;

    if (loginCookie) {
      const decodedUser = jwt.decode(loginCookie) as UserDto;
      if (decodedUser) {
        console.log("User decoded from cookie:", decodedUser);
        socket.emit("userConnected", decodedUser); // emit User connect
      }
    }
  } catch (error) {
    console.error("Error decoding cookie:", error);
  }

  const auctions = await Auction.find();
  socket.emit("auctionList", auctions);

  // JOIN AUCTION
  socket.on("joinAuction", async (auctionId: string) => {
    console.log("User joined auction:", auctionId);

    for (const room of socket.rooms) {
      if (room !== socket.id) {
        console.log("Leaving room:", room);
        socket.leave(room);
      }
    }

    socket.join(auctionId); // Join room by ID

    try {
      const auction = await Auction.findById(auctionId);

      if (!auction) {
        console.error("Auction not found:", auctionId);
        return;
      } else {
        console.log("Auction found:", auction.title);
        socket.emit("auctionDetails", auction); // EMIT AUCTION DETAILS
      }
    } catch (error) {
      console.error("Error fetching auction:", error);
      socket.emit("error", "Failed to fetch auction details.");
    }
  });
  // LEAVE AUCTION
  socket.on("leaveAuction", () => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        console.log("User left auction:", room);
        socket.leave(room);
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });
};
