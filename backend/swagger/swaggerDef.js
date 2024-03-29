const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "Express API for HouseToday Clone Project",
		version: "1.0.0",
		description: "This is a REST API application made with Express.",
	},
	servers: [
		{
			url: "http://localhost:3005",
			description: "Development server",
		},
	],
};

module.exports = swaggerDefinition;
