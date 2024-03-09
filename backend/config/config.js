
module.exports = {
    "development":{
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "port": Number(process.env.DB_PORT),
        "dialect": "mysql",
        "timezone": "+09:00"
      },
      "test": {
        "username": process.env.TEST_DB_USER,
        "password": process.env.TEST_DB_PASS,
        "database": process.env.TEST_DB_NAME,
        "host": process.env.TEST_DB_HOST,
        "port": Number(process.env.TEST_DB_PORT),
        "dialect": "mysql",
        "timezone": "+09:00"
      },
      "production": {
        "username": process.env.PRODUCTION_DB_USER,
        "password": process.env.PRODUCTION_DB_PASS,
        "database": process.env.PRODUCTION_DB_NAME,
        "host": process.env.PRODUCTION_DB_HOST,
        "port": Number(process.env.PRODUCTION_DB_PORT),
        "dialect": "mysql",
        "timezone": "+09:00"
      }
}
