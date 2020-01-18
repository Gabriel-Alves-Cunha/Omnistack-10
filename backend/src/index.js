const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const http = require("http");
const { setupWebsocket } = require("../websocket");

const app = express();
// @ts-ignore
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(
	"mongodb+srv://omnistack:omnistack@cluster0-71prz.mongodb.net/week10?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

app.use(cors());
app.use(express.json()); // Este tem que vir primeiro, só depois de cors!
app.use(routes);

// app.post("/users", (request, response) => {
//     // linha fixa (nunca muda)

//     // Principais métodos HTTP: get (pegar), post (criar), put (editar), delete

//     // Query Params: request.query (Filtros, ordenacao, paginacao, ...)
//     // Route Params: request.params (Identificar um recurso na alteracao ou remoção de coisas)
//     // Body: request.body (Dados para criacao ou alteracao de um registro)

//     console.log(request.body);
//     return response.json({ message: "Hello World" });
// });

server.listen(3333);
