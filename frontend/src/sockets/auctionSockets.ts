import { io } from 'socket.io-client';
import "../style.css";

export const socket = io("http://localhost:3000", {
    withCredentials: true,
});
socket.on("connect", () => {
    console.log("Connected to server with ID:", socket.id);
});

socket.on("userConnected", (user) => {
    console.log("Connected to server with ID:", user);
});


