import socketio from "socket.io-client";

const socket = socketio("http://127.0.0.1:3333", {
	autoConnect: false
});

function subscribeToNewDevs(subscribeFn) {
	socket.on("new-dev", subscribeFn);
}

function connect(latitude, longitude, techs) {
	socket.io.opts.query = {
		latitude,
		longitude,
		techs
	};

	socket.connect();

	socket.on("message", text => {
		console.log(text);
	});
}

function disconnect() {
	socket.connected ? socket.disconnect() : "socket was not connected";
}

export { connect, disconnect, subscribeToNewDevs };
