import { socket } from "./auctionSockets";
import { Auction } from "../models/Imodels";

export let selectedAuction = "";

export function joinAuction(auctionId: string) {
  console.log("Joining auction:", auctionId);
  selectedAuction = auctionId;
  socket.emit("joinAuction", auctionId); // EMIT JOIN AUCTION
}

export function displayAuctionModal(auction: Auction): void {
  // Hide auction list
  const auctionList = document.querySelector(".auction-list") as HTMLElement;
  if (auctionList) {
    auctionList.style.display = "none";
  }

  const auctionModal = document.getElementById("auctionModal") as HTMLElement;
  const modalTitle = document.getElementById(
    "modalTitle"
  ) as HTMLHeadingElement;
  const modalDescription = document.getElementById(
    "modalDescription"
  ) as HTMLParagraphElement;
  const modalCurrentBid = document.getElementById(
    "modalCurrentBid"
  ) as HTMLParagraphElement;
  const modalEndTime = document.getElementById(
    "modalEndTime"
  ) as HTMLParagraphElement;

  modalTitle.innerHTML = auction.title;
  modalDescription.innerHTML = auction.description;
  modalCurrentBid.innerHTML = `Nuvarande bud: ${auction.startPrice} kr`;
  modalEndTime.innerHTML = `Slutar: ${new Date(
    auction.endDate
  ).toLocaleString()}`;

  auction.bids.forEach((bid) => {
    const createdByP = document.createElement("p");
    const amountP = document.createElement("p");

    createdByP.innerHTML = bid.placedBy?.name || "Okänd användare";
    amountP.innerHTML = `${bid.amount} kr`;

    const myDiv = document.createElement("div");
    myDiv.appendChild(createdByP);
    myDiv.appendChild(amountP);

    const modalContent = document.getElementById("modalContent");
    if (modalContent) {
      modalContent.appendChild(myDiv);
    }
  });

  // Show the modal
  if (auctionModal) {
    auctionModal.style.display = "block";
  }
}
