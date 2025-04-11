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