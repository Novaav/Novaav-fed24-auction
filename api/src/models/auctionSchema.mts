import { Schema, model } from "mongoose";

const UserSubSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const BidSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  placedBy: { type: UserSubSchema, required: true },
});

const AuctionSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startPrice: { type: Number, required: true },
  endDate: { type: Date, required: true },
  createdBy: { type: UserSubSchema, required: true },
  bids: { type: [BidSchema], default: [] },
});

const Auction = model("Auction", AuctionSchema);
export default Auction;
