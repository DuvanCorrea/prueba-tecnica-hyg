const app = require("./src/app")

app.listen(app.get("PORT"), () => {
    console.log("Connection on port: ", app.get("PORT"))
})