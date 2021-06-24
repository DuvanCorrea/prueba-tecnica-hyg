const { Client } = require("pg")
const { DB } = require("./keys")

const connectionData = {
    user: DB.user,
    host: DB.host,
    database: DB.database,
    password: DB.password,
    port: DB.port,
}

const client = new Client(connectionData)

module.exports = client