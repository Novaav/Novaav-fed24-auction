import { Schema, model } from "mongoose";
import User from "./userSchema.mts"; // User modelen är helt skild från UserSubSchema

// Define a sub-schema for user fields
const UserSubSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});
// UserSubSchema kommer att användas för att referera till användare i bud och auktioner
const BidSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  placedBy: { type: UserSubSchema, required: true }, // Embeded userSubSchema
});

const AuctionSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startPrice: { type: Number, required: true },
  endDate: { type: Date, required: true },
  createdBy: { type: UserSubSchema, required: true }, // Embed user fields directly
  bids: { type: [BidSchema], default: [] }, // Array of BidSchema / eller en tom array
});

const Auction = model("Auction", AuctionSchema);
export default Auction;
// CJ EDIT - Det Sebastian använder sig utav är SubSchema, genom detta så kan vi använda hans lösning som under lektion.
// För om vi använder Mongoose ref_ så kommer vi behöva använda andra inbyggda funktioner som vi inte har lärt oss än.
// Det är därför vi använder oss av *SubSchema* istället för ref_  / eller populate_ inbyggda funktioner i mongoose.

// ref_ eller populate_ används för att referera till andra dokument i en annan collection. Vilket är en bra lösning för skalbar
// aka. om exempelvis om en användare byter namn så kommer det att uppdateras i hela databasen.
// men kanske "overkill" för vårat projekt.

//så strukturen för vårat projekt är att vi har en schema för auktioner och en schema för användare.
// och vi kommer att referera till användare i auktioner genom att använda oss av SubSchema.

//såhär kommer strukturen se ut i databasen:

// {
//   "_id": "1234567890abcdef12345678",
//   "title": "Old Nuclear bomb",
//   "description": "bomb from 1980.",
//   "startPrice": 5000,
//   "endDate": "2025-04-15T00:00:00.000Z",
//   "createdBy": {
//     "name": "CJ",
//     "email": "CJ@example.com"
//   },
//   "bids": [
//     {
//       "amount": 6000,
//       "placedBy": {
//         "name": "Nova",
//         "email": "Nova@example.com"
//       }
//     }
//   ]
// }