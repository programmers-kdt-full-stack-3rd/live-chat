import http from "http";
import { Server } from "socket.io";
import * as MessageService from "./db/context/messages";

export const initializeSocket = (server: http.Server) => {
	const io = new Server(server);

	io.on("connection", socket => {
		console.log("a user connected");

		socket.on("joinRoom", chatroomId => {
			socket.join(chatroomId);
			console.log(`user joined room: ${chatroomId}`);
		});

		socket.on("leaveRoom", chatroomId => {
			socket.leave(chatroomId);
			console.log(`user left room: ${chatroomId}`);
		});

		socket.on("chatMessage", async ({ chatroomId, userId, content }) => {
			const message = await MessageService.addMessages(
				chatroomId,
				userId,
				content
			);
			io.to(chatroomId).emit("chatMessage", message);
		});

		socket.on("disconnect", () => {
			console.log("user disconnected");
		});
	});
	return io;
};
