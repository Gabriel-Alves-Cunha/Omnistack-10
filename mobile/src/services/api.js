import axios from "axios";

const api = axios.create({
	baseURL: "http://127.0.0.1:3333" // Tem que ser o meu IP com a porta do backend!
});

export default api;
