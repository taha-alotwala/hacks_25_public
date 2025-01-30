const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("new connection : ", socket.id);

  socket.on("disconnect", () => {
    console.log("disconnect : ", socket.id);
  });
});

module.exports = { app, io, server };
