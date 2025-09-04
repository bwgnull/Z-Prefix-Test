module.exports = {
  development: {
    client: "pg",
    connection: "postgres://postgres:docker@localhost:5432/inventory",
  },

  staging: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      database: "inventory",
      user:  "postgres",
      password: "docker",
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