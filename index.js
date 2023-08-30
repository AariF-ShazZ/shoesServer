const express = require("express")
require("dotenv").config()
const port = process.env.port || 4500
const cors = require("cors")
const connection = require("./configs/db")
const { productsRoutes } = require("./routes/Products.route")
const app = express()
app.use(cors())

app.use(express.json())
app.get("/" ,(req,res) => {
    res.send("Home page")
})
app.use("/product",productsRoutes)
app.listen(port, async () => {
        await connection
        console.log(`Database connected successfully and Server running at port number ${port}`);

})