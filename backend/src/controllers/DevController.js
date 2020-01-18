const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../../websocket");

// Controller geralmente tem cinco funções no máximo (index, show, update, destroy)

module.exports = {
	async index(request, response) {
		const devs = await Dev.find();

		return response.json(devs);
	},

	async store(request, response) {
		const { github_username, techs, latitude, longitude } = request.body;

		let dev = await Dev.findOne({ github_username });

		if (!dev) {
			// @ts-ignore
			const apiResponse = await axios.get(
				`https://api.github.com/users/${github_username}`
			);

			// @ts-ignore
			const { name = login, avatar_url, bio } = apiResponse.data;

			const techsArray = parseStringAsArray(techs);

			const location = {
				type: "Point",
				coordinates: [longitude, latitude]
			};

			dev = await Dev.create({
				github_username,
				name,
				avatar_url,
				bio,
				techs: techsArray,
				location
			});

			// Filtrar as conexões que estao no máximo a 10km e pelo menos uma das techs.

			const sendSocketMesageTo = findConnections(
				{ latitude, longitude },
				techsArray
			);

			sendMessage(sendSocketMesageTo, "new-dev", dev);
		}
		// nos acimas usamos o short-syntax, quando a propriedade e o valor têm o mesmo nome!

		return response.json(dev);
	}
};
