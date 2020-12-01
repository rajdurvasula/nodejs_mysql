const blogUsersController = require("../controllers").blog_users;

module.exports = (app) => {
	// Retrieve all
	app.get("/api/blog_users", blogUsersController.findAll);
	// Retrieve by id
	app.get("/api/blog_users/:id", blogUsersController.findOne);
	// Create
	app.post("/api/blog_users", blogUsersController.create);
	// Update
	app.put("/api/blog_users/:id", blogUsersController.update);
	// Delete
	app.delete("/api/blog_users/:id", blogUsersController.delete);
};
