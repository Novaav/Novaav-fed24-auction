import Auction from "../models/auctionSchema.mts";
import { IAuctionDocument } from "../models/InterfaceAuctionSchema.mts";

export async function checkAuctionStatus() {
    const currentDate = new Date();

    // Hämta o hitta auctioner som har passerat slutdatum
    const endedAuctions = await Auction.find({
        status: "open",
        endDate: { $lt: currentDate } // $lt: "less than" in mongooiska - this case, currentDate. Letade efter "less than" i mongoDB-dokumentationen
    }) as IAuctionDocument[]; // Typecasting 

    console.log(`Found ${endedAuctions.length} auctions to process`);

    for (const auction of endedAuctions) {
        try {
            // Om auktionen har bud, sätt vinnaren till den högsta budgivaren
            if (auction.bids && auction.bids.length > 0) { // kolla om det finns bud och om det är mer än 0. Varje bud är ett objekt med amount och placedBy
                // Find highest bid
                const highestBid = auction.bids.reduce(
                    (max, bid) => bid.amount > max.amount ? bid : max,
                    auction.bids[0]
                );

                auction.winner = highestBid.placedBy; // Set winner
            }

            auction.status = "closed";
            await auction.save();

            console.log(`Auction ${auction._id} ${auction.title} has been closed, winner: ${auction.winner?.name || 'No bids were placed'}`);
        } catch {
            console.error(`Failed to process auction ${auction._id}: ${Error}`);
        }
    }
};
