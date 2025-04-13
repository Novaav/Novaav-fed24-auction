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
    } catch (error) {
        console.error("Failed to fetch auction details:", error);
      }
    }