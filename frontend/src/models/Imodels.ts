export interface UserInfo {
    name: string;
    email: string;
}

export interface Bid {
    amount: number;
    placedBy: UserInfo;
}

export interface Auction {
    _id: string;
    title: string;
    description: string;
    startPrice: number;
    endDate: string;
    createdBy: UserInfo;
    bids: Bid[];
    winner: UserInfo | null;
    status: "open" | "closed";
}