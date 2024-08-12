const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const app = express();
const server = https.createServer(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "https://192.168.100.12:3000",
		methods: ["GET", "POST"]
	}
});

// Use CORS middleware
app.use(cors({
    origin: "https://192.168.100.12:3000", // Update this to match the frontend origin
    methods: ["GET", "POST"]
}));

io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded");
	});

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal);
	});
});





// Load the SSL certificate and key
const key = fs.readFileSync('C:/Users/cubes/Postman/key.pem');
const cert = fs.readFileSync('C:/Users/cubes/Postman/cert.pem');

// Create HTTPS server
https.createServer({ key: key, cert: cert }, app)
  .listen(5000, '0.0.0.0', () => {
    console.log('Server is running on https://localhost:443');
  });


//server.listen(5000, '0.0.0.0', () => console.log("server is running on port 5000"));







































// const express = require("express")
// const http = require("http")
// const app = express()
// const server = http.createServer(app)
// const io = require("socket.io")(server, {
// 	cors: {
// 		origin: "http://localhost:3000",
// 		methods: [ "GET", "POST" ]
// 	}
// })

// io.on("connection", (socket) => {
// 	socket.emit("me", socket.id)

// 	socket.on("disconnect", () => {
// 		socket.broadcast.emit("callEnded")
// 	})

// 	socket.on("callUser", (data) => {
// 		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
// 	})

// 	socket.on("answerCall", (data) => {
// 		io.to(data.to).emit("callAccepted", data.signal)
// 	})
// })

// server.listen(5000, () => console.log("server is running on port 5000"))
