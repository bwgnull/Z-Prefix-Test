module.exports = {
  development: {
    client: "pg",
    connection: "postgres://postgres:docker@db:5432/inventory",
  },

  staging: {
    client: "pg",
    connection: {
      host: process.env.DATABASE_HOST || "postgres",
      port: process.env.DATABASE_PORT || 5432,
      database: process.env.DATABASE_NAME || "inventory",
      user: process.env.DATABASE_USER || "postgres",
      password: process.env.DATABASE_PASSWORD || "docker",
    },
  },

  production: {
    client: "pg",
    connection: {
      database: "inventory",
      user: "postgres",
      password: "docker",
    },
  },
};