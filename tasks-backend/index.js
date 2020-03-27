const express = require('express')
const app = express()
const db = require('./config/db')
// consign ajudar a manipula as informções entres os componentes da aplicação
const consign = require('consign')

// isso e para acessa todos os metodos do back
consign()
    .include('./config/passaport.js')
    .then('./config/middlewares.js')
    .then('api')
    .then('./config/routes.js')
    .into(app)
// para fazer alterções no banco consultar
app.db = db

app.listen(3000, () => {
    console.log('Mue backend 1') 
})