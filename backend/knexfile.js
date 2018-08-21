// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'process.env.DB_NAME',
      user: 'process.env.DB_USERNAME',
      password: 'process.env.DB_PASSWORD'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'process.env.DB_NAME',
      user: 'process.env.DB_USERNAME',
      password: 'process.env.DB_PASSWORD'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    onnection: {
      database: 'process.env.DB_NAME',
      user: 'process.env.DB_USERNAME',
      password: 'process.env.DB_PASSWORD'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
