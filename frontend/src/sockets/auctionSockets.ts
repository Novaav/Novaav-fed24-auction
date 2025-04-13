import { io } from 'socket.io-client';
import "../style.css";

const socket = io("http://localhost:3000", {
    withCredentials: true,
});

socket.emit("connection", () => {
    console.log("Connected to server with ID:", socket.id);
});


