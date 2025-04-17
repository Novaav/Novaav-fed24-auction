import { Socket } from "socket.io";
import cookie from "cookie";
import Auction from "../models/auctionSchema.mts";
import jwt from "jsonwebtoken";
import { UserDto } from "../models/userDto.mts";
import { Document } from "mongoose";

export const auctionSocket = async (socket: Socket, io) => {
  console.log("a user connected", socket.id);

  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const loginCookie = cookies.login;
    if (loginCookie) {
      const decodedUser = jwt.decode(loginCookie) as UserDto;
      if (decodedUser) {
        console.log("User decoded from cookie:", decodedUser);
        socket.emit("userConnected", decodedUser);
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

    socket.join(auctionId);

    try {
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
        console.log("Auction bids:", auction.bids);
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
  // PLACE BID
  interface BidData {
    auctionId: string;
    amount: number;
  }
  interface Bid {
    amount: number;
    placedBy: {
      name: string;
      email: string;
    };
  }
  interface AuctionData {
    title: string;
    description: string;
    startPrice: number;
    endDate: Date;
    createdBy: {
      name: string;
      email: string;
    };
    bids: Bid[];
  }

  socket.on("placeBid", async (data: BidData) => {
    try {
      const { auctionId, amount } = data;
      console.log(`Received bid: ${amount} for auction: ${auctionId}`);

      const cookies = cookie.parse(socket.handshake.headers.cookie || "");
      const loginCookie = cookies.login;

      if (!loginCookie) {
        socket.emit("error", "Du måste vara inloggad för att lägga bud"); // EMIT ERROR
        return;
      }
      const decodedUser = jwt.decode(loginCookie) as UserDto;
      if (!decodedUser) {
        socket.emit("error", "Ogiltig inloggning, logga in igen"); // EMIT ERROR
        return;
      }

      const auction = (await Auction.findById(auctionId)) as Document &
        AuctionData;
      if (!auction) {
        socket.emit("error", "Auktionen hittades inte");
        return;
      }
      // Check IF user is the creator
      if (decodedUser.email === auction.createdBy.email) {
        socket.emit("error", "Du kan inte bjuda på din egen auktion"); // EMIT ERROR
        return;
      }
      // check if auction is ended
      const currentDate = new Date();
      if (currentDate > auction.endDate) {
        socket.emit("error", "Auktionen är avslutad"); // EMIT ERROR
        return;
      }


      // Valid bid amount och find highest bid
      if (auction.bids.length > 0) {
        const highestBid = auction.bids.reduce(
          // Hitta högsta budet
          (max, bid) => (bid.amount > max.amount ? bid : max),
          auction.bids[0]
        );

        // om budet är lägre än högsta budet
        if (amount <= highestBid.amount) {
          socket.emit(
            "error",
            "Budet måste vara högre än nuvarande högsta bud"
          ); // EMIT ERROR
          return;
        }
      } else if (amount < auction.startPrice) {
        // detta är första budet
        socket.emit("error", "Budet måste vara minst startpriset");
        return;
      }

      // Create and add new bid
      const newBid = {
        amount,
        placedBy: {
          name: decodedUser.username,
          email: decodedUser.email,
        },
      };

      // Add bid to auction and save
      auction.bids.push(newBid);
      await auction.save();

      console.log(
        `New bid of ${amount} kr placed by ${decodedUser.username} on auction ${auction.title}`
      );

      // Broadcast to all clients in this auction room
      io.to(auctionId).emit("bidUpdate", auction); // EMIT BID UPDATE to ROOM(auctionId)
    } catch (error) {
      console.error("Error processing bid:", error);
      socket.emit("error", "Det gick inte att lägga budet");
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
        const newBid: Bid = {
          amount: newBidAmount,
          placedBy: {
            name: bidBy,
            email: bidEmail,
          },
        };

        if (!Array.isArray(selectedAuction.bids)) {
          selectedAuction.bids = [];
        }

        selectedAuction.bids.push(newBid);
        await selectedAuction.save();

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
