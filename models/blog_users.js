'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blog_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
	    blog_users.hasMany(models.blog_posts, {
		    foreignKey: 'blog_user_id',
		    as: 'posts',
	    });
    }
  };
  blog_users.init({
    user_id: DataTypes.STRING,
    email_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'blog_users',
  });
  return blog_users;
};
