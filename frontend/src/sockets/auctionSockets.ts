import { io } from "socket.io-client";
import "../styles/main.css";
import { Auction, UserInfo } from "../models/Imodels";
import { displayAuctionModal } from "./sockethelpers";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { selectedAuction } from "./sockethelpers";

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
  const cookies = cookie.parse(document.cookie || "");
  const loginCookie = cookies.login;
  if (loginCookie) {
    const decoded = jwt.decode(loginCookie);
    if (!decoded || typeof decoded === "string") {
      console.error("Invalid token or decoding failed");
      return;
    }

    const decodedUser = decoded as UserInfo;
    const bidBy = decodedUser.name;
    const bidEmail = decodedUser.email;
    const inputBid = document.getElementById("bidAmount") as HTMLInputElement;
    const newBidAmount = inputBid.value;

    socket.emit("placedBid", newBidAmount, bidBy, bidEmail, selectedAuction);
  }
});
