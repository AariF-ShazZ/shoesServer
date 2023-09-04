const { CartModel } = require("../models/Cart.model")

const cartPostData = async (req, res) => {
    const data = req.body
    try {
        const isProduct = await CartModel.findOne({ _id: data._id, sizes: data.sizes })
        if (isProduct) {
            isProduct.qty = isProduct.qty + 1;
           let result =  await isProduct.save(); 
            res.send({ result :result});
        } else {
            const product = new CartModel(data)
            await product.save()
            res.send(product)
        }
    } catch (err) {
        res.send({ error: err })
    }
}
const cartGetData = async (req, res) => {
    try {
        const result = await CartModel.find()
        res.send({ "Result =>": result })
    } catch (err) {
        res.send({ "error": err.message })
    }
}
const cartIncreaseQuantity = async (req, res) => {
    const data = req.body; 

    try {
        const product = await CartModel.findOne({ _id: data._id, sizes: data.sizes })
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        product.qty += 1;
        await product.save();
        const result = await CartModel.find()
        res.send({ "Result =>": result })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

const cartDecreaseQuantity = async (req, res) => {
    const data = req.body; 
    try {
        const product = await CartModel.findOne({ _id: data._id, sizes: data.sizes });

        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }

        if (product.qty === 1) {
            await CartModel.findByIdAndDelete(product._id);
            const result = await CartModel.find(); 
            return res.send({ "deletedProduct =>": result });
        }

        product.qty -= 1;
        await product.save();
        const result = await CartModel.find(); 
        res.send({ "Result =>": result });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

module.exports = { cartDecreaseQuantity, cartGetData, cartIncreaseQuantity, cartPostData }