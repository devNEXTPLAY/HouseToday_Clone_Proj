const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js")[env];

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require("./users.js")(sequelize, Sequelize);
db.Blogs = require("./blogs/blogs.js")(sequelize, Sequelize);
db.Hashtags = require("./blogs/hashtags.js")(sequelize, Sequelize);
db.Comments = require("./blogs/comments.js")(sequelize, Sequelize);
db.BlogHashtags = require("./blogs/blogHashtags.js")(sequelize, Sequelize);
db.BlogLikes = require("./blogs/blogLikes.js")(sequelize, Sequelize);
db.CommentLikes = require("./blogs/commentLikes.js")(sequelize, Sequelize);

// User Blogs
db.Users.hasMany(db.Blogs, { foreignKey: "user_id" });
db.Blogs.belongsTo(db.Users, { foreignKey: "user_id", as: "User" });

// User Comments
db.Users.hasMany(db.Comments, { foreignKey: "user_id" });
db.Comments.belongsTo(db.Users, { foreignKey: "user_id" });

// Blog Comments
db.Blogs.hasMany(db.Comments, { foreignKey: "blog_id" });
db.Comments.belongsTo(db.Blogs, { foreignKey: "blog_id" });

// Blog Hashtags
db.Blogs.belongsToMany(db.Hashtags, { through: db.BlogHashtags, foreignKey: "blog_id" });
db.Hashtags.belongsToMany(db.Blogs, { through: db.BlogHashtags, foreignKey: "hashtag_id" });

// Comment Replies
db.Comments.hasMany(db.Comments, { as: "Replies", foreignKey: "parent_id" });
db.Comments.belongsTo(db.Comments, { as: "Parent", foreignKey: "parent_id" });

// Blog Likes
db.Users.belongsToMany(db.Blogs, {
	through: db.BlogLike,
	foreignKey: "user_id",
	otherKey: "blog_id",
});
db.Blogs.belongsToMany(db.Users, {
	through: db.BlogLike,
	foreignKey: "blog_id",
	otherKey: "user_id",
});

// Comment Likes
db.Users.belongsToMany(db.Comments, {
db.Comments.belongsToMany(db.Users, {


module.exports = db;
