const { connect } = require("../configs/database");
const client = require("../configs/database");

const proyectoCtrl = {
    get: (req, res) => {
        console.log("holi")
    },

    getOne: (req, res) => {
        console.log(req.params)
        client.connect()
    }
}

module.exports = proyectoCtrl;