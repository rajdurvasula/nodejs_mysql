const blogUsersController = require("../controllers").blog_users;
const blogPostsController = require("../controllers").blog_posts;

module.exports = (app) => {
	// Blog users
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
	// Blog posts
	// Create
	app.post("/api/blog_users/:id/posts", blogPostsController.create);
	// Retrieve posts by user
	app.get("/api/blog_users/:id/posts", blogPostsController.findByUser);
	// Retrieve all posts
	app.get("/api/blog_posts", blogPostsController.findAll);
	// Update post
	app.put("/api/blog_posts/:id", blogPostsController.update);
	// Delete post
	app.delete("/api/blog_posts/:id", blogPostsController.delete);
};
