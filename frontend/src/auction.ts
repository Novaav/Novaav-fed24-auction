import axios from "axios";
import "./styles/base.css";
import { Auction } from "../src/models/Imodels.ts";
import { joinAuction } from "../src/sockets/sockethelpers.ts";
import '../src/sockets/auctionSockets.ts';

const auctionList = document.getElementById("auctionList");

async function fetchAuctions() {
  try {
    const response = await axios.get<Auction[]>("http://localhost:3000/auctions", {
      withCredentials: true,
    });

    const auctions = response.data;

    auctionList!.innerHTML = "";

    auctions.forEach((auction: Auction) => {
      const auctionDiv = document.createElement("div");
      auctionDiv.classList.add("auction");

      auctionDiv.innerHTML = `
        <h3>${auction.title}</h3>
        <p>${auction.description}</p>
        <p>Startpris: ${auction.startPrice} kr</p>
        <p>Skapad av: ${auction.createdBy.name}</p>
        <p>Slutar: ${new Date(auction.endDate).toLocaleString()}</p>
        <button class="Join-room-btn" data-title='${auction._id}'>Gå med</button>
      `;

      auctionList?.appendChild(auctionDiv);
    });
    // Event listener for the auction list buttons
    document.querySelectorAll(".Join-room-btn").forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();

        const targetAuction = e.currentTarget as HTMLButtonElement;
        const auctionId = targetAuction.getAttribute("data-title") as string;


        if (auctionId) {
          console.log("User clicked auction:", auctionId);
          joinAuction(auctionId); // JOIN ACTION
        }
      });
    });
  } catch (error) {
    console.error("Failed to fetch auctions:", error);
  }
}



document.getElementById("createAuctionForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const auctionTitle = (document.getElementById("auctionTitle") as HTMLInputElement).value;
  const auctionDescription = (document.getElementById("auctionDescription") as HTMLTextAreaElement).value;
  const startPrice = parseFloat((document.getElementById("startPrice") as HTMLInputElement).value);
  const endDateInput = (document.getElementById("endDate") as HTMLInputElement).value;

  const endDate = new Date(endDateInput);
  endDate.setHours(23, 59, 59, 999);
  try {
    const response = await axios.post(
      "http://localhost:3000/auctions",
      {
        title: auctionTitle,
        description: auctionDescription,
        startPrice,
        endDate,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status === 201) {
      alert("Auktionen skapades!");
      fetchAuctions();
    }
  } catch (error) {
    console.error("Failed to create auction:", error);
    alert("Det gick inte att skapa auktionen. Försök igen.");
  }
});
fetchAuctions();

