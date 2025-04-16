import { Socket } from "socket.io";
import cookie from "cookie";
import Auction from "../models/auctionSchema.mts";
import jwt from "jsonwebtoken";
import { UserDto } from "../models/userDto.mts";
import { InferSchemaType, Document } from "mongoose";

export const auctionSocket = async (socket: Socket, io) => {
  console.log("a user connected", socket.id);

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

    // Leave all other rooms except the socket's own room
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        console.log("Leaving room:", room);
        socket.leave(room);
      }
    }

    socket.join(auctionId); // Join room by ID

    try {
      // Define the interface for the auction document
      interface AuctionDocument extends Document {
        _id: string;
        title: string;
        bids: Array<{
          amount: string;
          placedBy: {
            name: string;
            email: string;
          };
        }>;
        [key: string]: any;
      }

      const auction = (await Auction.findById(auctionId)) as AuctionDocument;
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

  socket.on(
    "placedBid",
    async (
      newBidAmount: string,
      bidBy: string,
      bidEmail: string,
      auctionId: string
    ) => {
      console.log(auctionId);

      // Define interfaces for proper typing
      interface BidPlacedBy {
        name: string;
        email: string;
      }

      interface Bid {
        amount: string;
        placedBy: BidPlacedBy;
      }

      interface AuctionDocument extends Document {
        _id: string;
        title: string;
        bids: Bid[];
        [key: string]: any;
      }

      const selectedAuction = (await Auction.findOne({
        _id: auctionId,
      })) as AuctionDocument;

      if (selectedAuction) {
        // Create the new bid object
        const newBid: Bid = {
          amount: newBidAmount,
          placedBy: {
            name: bidBy,
            email: bidEmail,
          },
        };

        // Initialize bids array if it doesn't exist
        if (!Array.isArray(selectedAuction.bids)) {
          selectedAuction.bids = [];
        }

        // Add the new bid to the auction
        selectedAuction.bids.push(newBid);
        await selectedAuction.save();

        // Notify all users in the auction room
        io.to(auctionId).emit("newBid", newBid);
      } else {
        console.error("Auction not found:", auctionId);
        socket.emit("error", "Auction not found.");
      }
    }
  );

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });
};
