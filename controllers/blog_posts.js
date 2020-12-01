const db = require("../models");
const BlogUsers = db.blog_users;
const BlogPosts = db.blog_posts;
const Op = db.Sequelize.Op;

// Create Blog post
exports.create = (req, res) => {
	// validate input
	const blog_user_id = req.params.id;
	const { title, description, pub_date } = req.body;

	if (title && description && pub_date && blog_user_id) {
		BlogUsers.findByPk(blog_user_id)
		.then(data => {
			BlogPosts.create({
				title: req.body.title,
				description:  req.body.description,
				pub_date: req.body.pub_date,
				blog_user_id: data.id
			}).then(record => {
				res.status(201).send(record);
			}).catch(err => {
				res.status(500).send({
					message: err.message || "Error creating Blog post."
				});
			});
		})
		.catch(err => {
			res.status(400).send({
				message: `Blog user with id: ${blog_user_id} not found!`
			});
		});
	} else {
		res.status(400).send({
			message: "Missing input values!"
		});
	}
};

// Retrieve Blog posts by user
exports.findByUser = (req, res) => {
	const blog_user_id = req.params.id;
	var condition = { blog_user_id: { [Op.eq]: `${blog_user_id}` } };
	BlogUsers.findByPk(blog_user_id)
	.then(data => {
		BlogPosts.findAll({ where: condition })
		.then(records => {
			res.send(records);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || `Error retrieving posts for user id: ${data.id}`
			});
		});
	})
	.catch(err => {
		res.status(400).send({
			message:  `Blog user with id: ${blog_user_id} not found!`
		});
	});
};

// Retrieve all posts
exports.findAll = (req, res) => {
	BlogPosts.findAll({
		where: {}
	})
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message: "Error while retrieving Blog posts."
		});
	});
};
