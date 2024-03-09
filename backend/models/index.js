const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js")[env];

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require("./users.js")(sequelize, Sequelize);
db.Blogs = require("./blogs/blogs.js")(sequelize, Sequelize);
db.Hashtags = require("./blogs/hashtags.js")(sequelize, Sequelize);
db.Comments = require("./blogs/comments.js")(sequelize, Sequelize);
db.BlogHashtags = require("./blogs/blogHashtags.js")(sequelize, Sequelize);

module.exports = db;
