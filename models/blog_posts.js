'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blog_posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
	    blog_posts.belongsTo(models.blog_users, {
		    foreignKey: 'blog_user_id',
		    onDelete: 'CASCADE',
	    });
    }
  };
  blog_posts.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    pub_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'blog_posts',
  });
  return blog_posts;
};
