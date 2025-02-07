const express = require("express");
require("dotenv").config()
const dbConfig = require("./config/dbconfig")
const userRoute = require("./routes/userRoute")
const transactionsRoute = require("./routes/transactionsRoute")
const requestsRoute = require("./routes/requestsRoute")
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/users", userRoute)
app.use("/api/tranactions", transactionsRoute)
app.use("/api/requests", requestsRoute )

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})