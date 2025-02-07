const mongoose = require("mongoose")

console.log(process.env.MONGO_URL)
console.log(process.env.JWT_SECRET)

const connection = "mongodb+srv://prakalpjha888:kNjNlSsjp3Py8Ukq@cluster0.tqvrc3n.mongodb.net/PayWallet"

mongoose.connect(connection)

const connectionResult = mongoose.connection;

connectionResult.on("error", () => {
    console.log("DB connection Failed")
})

connectionResult.on("connected", () => {
    console.log("DB connected Successfull")
})


