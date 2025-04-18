
import { Document } from "mongoose";

export interface UserSub {
    name: string;
    email: string;
}

export interface Bid {
    amount: number;
    placedBy: UserSub;
}


export interface IAuction {
    title: string;
    description: string;
    startPrice: number;
    endDate: Date;
    createdBy: UserSub;
    bids: Bid[];
    winner: UserSub | null;
    status: "open" | "closed";
}

export interface IAuctionDocument extends IAuction, Document {
}


// export interface IAuctionDocument {
//     title: string;
//     description: string;
//     startPrice: number;
//     endDate: Date;
//     createdBy: {
//         name: string;
//         email: string;
//     };
//     bids: Array<{
//         amount: number;
//         placedBy: {
//             name: string;
//             email: string;
//         }
//     }>;
//     winner: {
//         name: string;
//         email: string;
//     } | null;
//     status: "open" | "closed";
// }