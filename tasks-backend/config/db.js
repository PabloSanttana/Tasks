const config = require('../knexfile.js')
const knex = require('knex')(config)


// muito cuidado com isso quando ouver muitos BD
knex.migrate.latest([config])
module.exports = knex

// este modulos e especialmente para os banco de dados 