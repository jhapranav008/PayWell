const mongoose = require("mongoose")

const connection = process.env.MONGO_URL

mongoose.connect(connection)

const connectionResult = mongoose.connection;

connectionResult.on("error", () => {
    console.log("DB connection Failed")
})

connectionResult.on("connected", () => {
    console.log("DB connected Successfull")
})


