// Update with your config settings.
// conction com o banco de dados
module.exports = {
      client: 'postgresql',
      connection: {
        database: 'tasks',
        user:     'postgres',
        password: 'postgres'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }

};
