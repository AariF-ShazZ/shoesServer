const express = require("express")
require("dotenv").config()
const port = process.env.port || 4500
const cors = require("cors")
const stripe = require("stripe")("sk_test_51OJZ8gSDd29kDZwr94TpGvCTNdcReooPJIVaHDcIN71bZFc9gC1LVUJMsUJEJdkceKQOLTu1NQiWQTSiy3RjWUip00MLgLdplP")
const connection = require("./configs/db")
const { productsRoutes } = require("./routes/Products.route")
const { userRoutes } = require("./routes/User.route")
const { cartRoutes } = require("./routes/Cart.route")
const { authenticate } = require("./middleware/authenticate.middleware")
const { orderRoutes } = require("./routes/Order.route")
const app = express()
app.use(cors())

app.use(express.json())
app.get("/" ,(req,res) => {
    res.send("Home page")
})
app.use("/user",userRoutes)
app.use("/product",productsRoutes)
app.use("/order",orderRoutes)



app.post("/api/create-checkout-session",async(req,res) => {
    const {products} = req.body
    // console.log(products)
    const lineItems =products.length > 0  &&  products.map((product) => ({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.name
            },
            unit_amount:product.final_price*100,
        },
        quantity:product.qty
    }))
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Change payment_methods_types to payment_method_types
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });
    
    res.status(200).json({
        status: 'success',
        message: 'Payment successfull',
        id: session.id
    });
})

app.use(authenticate)
app.use("/cart",cartRoutes)

app.listen(port, async () => {
        await connection
        console.log(`Database connected successfully and Server running at port number ${port}`);

})