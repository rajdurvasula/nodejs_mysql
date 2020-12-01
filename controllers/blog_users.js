const db = require("../models");
const BlogUsers = db.blog_users;
const Op = db.Sequelize.Op;

// Create new Blog user
exports.create = (req, res) => {
	// validate input
	const { user_id, email_id } = req.body
	
	if (user_id && email_id) {
		BlogUsers.create({
			user_id: req.body.user_id,
			email_id: req.body.email_id
		}).then(data => {
			res.status(201).send(data);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Error creating Blog user."
			});
		});
	} else {
		res.status(400).send({
			message: "user_id, email_id are missing !"
		});
	}
};

// Retrieve all Blog users
exports.findAll = (req, res) => {
	BlogUsers.findAll({
		where: {}
	})
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message: "Error while retrieving Blog users."
		});
	});
};

// Retrieve Blog user by Id
exports.findOne = (req, res) => {
	const id = req.params.id;

	BlogUsers.findByPk(id)
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message: "Error while retrieving Blog user with id: "+id
		});
	});
};

// Update Blog user
exports.update = (req, res) => {
	const id = req.params.id;

	BlogUsers.update(req.body, {
		where: { id: id }
	})
	.then(num => {
		if (num == 1) {
			res.send({
				message: `Updated Blog user with id: ${id}`
			});
		} else {
			res.send({
				message: `Cannot update Blog user with id: ${id}`
			});
		}
	})
	.catch(err => {
		res.status(500).send({
			message: "Error updating Blog user with id: "+id
		});
	});
};

// Delete Blog user
exports.delete = (req, res) => {
	const id = req.params.id;

	BlogUsers.destroy({
		where: { id: id }
	})
	.then(num => {
		if (num == 1) {
			res.send({
				message: `Deleted Blog user with id: ${id}`
			});
		} else {
			res.send({
				message: `Cannot delete Blog user with id: ${id}`
			});
		}
	})
	.catch(err => {
		res.send({
			message: "Error deleting Blog user with id: "+id
		});
	});
};
