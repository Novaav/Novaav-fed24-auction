import axios from "axios";

const auctionList = document.getElementById("auctionList");

async function fetchAuctions() {
  try {
    const response = await axios.get("http://localhost:3000/auctions", {
      withCredentials: true,
    });

    const auctions = response.data;

    auctionList!.innerHTML = "";

    auctions.forEach((auction: any) => {
      const auctionDiv = document.createElement("div");
      auctionDiv.classList.add("auction");

      auctionDiv.innerHTML = `
        <h3>${auction.title}</h3>
        <p>${auction.description}</p>
        <p>Startpris: ${auction.startPrice} kr</p>
        <p>Slutar: ${new Date(auction.endDate).toLocaleString()}</p>
        <button onclick="joinAuction('${auction._id}')">Gå med</button>
      `;

      auctionList?.appendChild(auctionDiv);
    });
  } catch (error) {
    console.error("Failed to fetch auctions:", error);
  }
}

fetchAuctions();