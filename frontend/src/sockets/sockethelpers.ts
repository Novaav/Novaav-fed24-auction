import { socket } from './auctionSockets'
import { Auction } from '../models/Imodels';


export function joinAuction(auctionTitle: string) {
    console.log("Joining auction:", auctionTitle);
    socket.emit("joinAuction", auctionTitle); // EMIT JOIN AUCTION
}

// Display auction data in modal
export function displayAuctionModal(auction: Auction): void {
    // Hide auction list
    const auctionList = document.getElementById("auctionList") as HTMLElement;
    if (auctionList) {
        auctionList.style.display = "none";
    }

    const auctionModal = document.getElementById("auctionModal") as HTMLElement;
    const modalTitle = document.getElementById("modalTitle") as HTMLHeadingElement;
    const modalDescription = document.getElementById("modalDescription") as HTMLParagraphElement;
    const modalCurrentBid = document.getElementById("modalCurrentBid") as HTMLParagraphElement;
    const modalEndTime = document.getElementById("modalEndTime") as HTMLParagraphElement;


    modalTitle.innerHTML = auction.title;
    modalDescription.innerHTML = auction.description;
    modalEndTime.innerHTML = `Slutar: ${new Date(auction.endDate).toLocaleString()}`;

    // Show the modal
    if (auctionModal) {
        auctionModal.style.display = "block";
    }
}
