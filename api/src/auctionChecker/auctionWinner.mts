export async function checkAuctionWinner(auction, io) {
    try {
        if (auction.bids && auction.bids.length > 0) {
            // Find highest bid
            const highestBid = auction.bids.reduce(
                (max, bid) => bid.amount > max.amount ? bid : max,
                auction.bids[0]
            );

            auction.winner = highestBid.placedBy; // Set winner
        }
        auction.status = "closed";
        await auction.save();

        io.to(auction._id).emit("auctionClosed", auction); // EMIT AUCTION CLOSED to ROOM(auctionId)

        return auction; // Return the updated auction object
    } catch (error) {
        console.error(`Failed to process auction ${auction._id}: ${error}`);
        throw error; // Rethrow the error for further handling if needed
    }
}