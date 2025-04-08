import { Schema, model } from "mongoose";
import User from "./userSchema.mts";

const BidSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  placedBy: { type: User },
});

const AuctionSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startPrice: { type: Number, required: true },
  endDate: { type: Date, required: true },
  createdBy: { type: User },
  bids: { type: [BidSchema], default: [] },
});

const Auction = model("Auction", AuctionSchema);
export default Auction;
