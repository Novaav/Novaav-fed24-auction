import express from "express";
import Auction from "../models/auctionSchema.mts";

const auctionRouter = express.Router();

auctionRouter.get("/", async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch auctions", error });
  }
});

export default auctionRouter;