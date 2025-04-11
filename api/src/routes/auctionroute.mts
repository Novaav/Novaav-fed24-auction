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
auctionRouter.post("/", async (req, res) => {
  const { title, description, startPrice, endDate } = req.body;

  if (!title || !description || !startPrice || !endDate) {
    return res.status(400).json();
  }

  try {
    const normalizedEndDate = new Date(endDate);
    normalizedEndDate.setHours(23, 59, 59, 999);
    
    const newAuction = new Auction({
      title,
      description,
      startPrice,
      endDate,
      createdBy: {
        name: "Test User", 
        email: "test@example.com", 
      },
      bids: [],
    });

    await newAuction.save();
    res.status(201).json();
  } catch (error) {
    console.error("Failed to create auction:", error);
    res.status(500).json();
  }
});

export default auctionRouter;