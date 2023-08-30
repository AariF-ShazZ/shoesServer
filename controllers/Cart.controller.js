const {CartModel} = require("../models/Cart.model")

const cartPostData = async (req, res) => {
    const data = req.body
    try {
        const product = new CartModel(data)
        await product.save()
        res.send(data)
    } catch (err) {
        res.send("error")
    }
}

const cartGetData = async (req, res) => {
    const ID = req.params.id
    console.log("data => ",ID);
    try {
        const result = await ProductsModel.findById({_id:ID});
        res.send(result);
    } catch (err) {
        res.send("error")
    }
}
const getData = async (req, res) => {
    try {
        const result = await ProductsModel.find()
        // const arr = result.length
        res.send(result)
    } catch (err) {
        res.send("error")
    }
}
const updateData = async (req, res) => {
    const data = req.body
    try {
        res.send("UPDATE")
    } catch (err) {
        res.send("error")
    }
}
const deleteData = async (req, res) => {
    const ID=req.params.id
    try {
         await ProductsModel.findByIdAndDelete({_id:ID})
        res.send(`Deleted the Product whose id is ${ID}`)
    } catch (err) {
        req.send("error")
    }
}
module.exports = { postData, getData, updateData, deleteData, postAllData,singleData }