import { Socket } from "socket.io";

export const auctionSocket = (socket: Socket, io) => {
  console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });
};
