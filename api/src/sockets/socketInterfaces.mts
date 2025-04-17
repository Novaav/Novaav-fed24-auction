export interface BidData {
    auctionId: string;
    amount: number;
}
export interface Bid {
    amount: number;
    placedBy: {
        name: string;
        email: string;
    };
}
export interface AuctionData {
    title: string;
    description: string;
    startPrice: number;
    endDate: Date;
    createdBy: {
        name: string;
        email: string;
    };
    bids: Bid[];
    winner: {
        name: string;
        email: string;
    } | null;
    status: string;
}