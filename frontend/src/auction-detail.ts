import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { withCredentials: true });

async function fetchAuctionDetails() {
    const params = new URLSearchParams(window.location.search);
    const auctionId = params.get("id");
  
    if (!auctionId) {
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:3000/auctions/${auctionId}`, {
        withCredentials: true,
      });
      const auction = response.data;

      const auctionTitle = document.getElementById("Title");
      const auctionDescription = document.getElementById("Description");
      const auctionStartPrice = document.getElementById("StartPrice");
      const auctionEndTime = document.getElementById("EndTime");
  
      if (auctionTitle) auctionTitle.textContent = auction.title;
      if (auctionDescription) auctionDescription.textContent = auction.description;
      if (auctionStartPrice) auctionStartPrice.textContent = `Startpris: ${auction.startPrice} kr`;
      if (auctionEndTime) auctionEndTime.textContent = `Slutar: ${new Date(auction.endDate).toLocaleString()}`;
    } catch (error) {
        console.error("Failed to fetch auction details:", error);
      }
    }