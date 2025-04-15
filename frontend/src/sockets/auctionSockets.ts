import { io } from "socket.io-client";
import "../styles/main.css";
import { Auction } from "../models/Imodels";
import { displayAuctionModal } from "./sockethelpers";

export const socket = io("http://localhost:3000", {
  withCredentials: true,
});
socket.on("connect", () => {
  console.log("Connected to server with ID:", socket.id);
});

socket.on("auctionDetails", (auction: Auction) => {
  console.log("Auction details received:", auction);
  displayAuctionModal(auction); // Display auction details in modal
});

socket.on("userConnected", (user) => {
  console.log("Connected to server with ID:", user);
});

document.getElementById("placeBidButton")?.addEventListener("click", () => {
  const inputBid = document.getElementById("bidAmount") as HTMLInputElement;
  const newBidAmount = inputBid.value;

  socket.emit("placedBid", newBidAmount);
});
