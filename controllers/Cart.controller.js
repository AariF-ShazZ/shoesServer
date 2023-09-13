const { CartModel } = require("../models/Cart.model")

const cartPostData = async (req, res) => {
    const data = req.body;
    const userID = req.body.userId;
    try {
        const isProduct = await CartModel.findOne({ productID: data._id, size: data.size });
        console.log("isProduct", isProduct ? "true" : "false");
        if (isProduct) {
            isProduct.qty = isProduct.qty + 1;
            await isProduct.save();
            const result = await CartModel.find();
            res.status(200).json({
                status: 'success',
                message: 'Product quantity updated successfully',
                data: result
            });
        } else {
            console.log("first time");
            const newPayload = {
                productID: data._id,
                userID,
                name: data.name,
                color: data.color,
                gender: data.gender,
                original_price: data.original_price,
                final_price: data.final_price,
                images: data.images,
                size: data.size,
                reviews: data.reviews,
                rating: data.rating
            };

            const product = new CartModel(newPayload);
            await product.save();
            const result = await CartModel.find();
            res.status(201).json({
                status: 'success',
                message: 'Product added to cart successfully',
                data: result
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: err.message
        });
    }
};

const cartGetData = async (req, res) => {
    const userID = req.body.userId;
    try {
        const result = await CartModel.find({ userID });
        if (result.length > 0) { 
            res.status(200).json({
                status: 'success',
                message: 'Cart data retrieved successfully',
                data: result
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: "You don't have products in Cart"
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: err.message
        });
    }
};


const cartIncreaseQuantity = async (req, res) => {
    const data = req.body;
    try {
        const product = await CartModel.findOne({ productID: data.productID, size: data.size });
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
        }
        product.qty += 1;
        await product.save();
        const result = await CartModel.find();
        res.status(200).json({
            status: 'success',
            message: 'Product quantity increased successfully',
            data: result
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: err.message
        });
    }
};


const cartDecreaseQuantity = async (req, res) => {
    const data = req.body;

    try {
        const product = await CartModel.findOne({ productID: data.productID, size: data.size });

        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
        }

        if (product.qty === 1) {
            await CartModel.findByIdAndDelete(product._id);
            const result = await CartModel.find();
            return res.status(200).json({
                status: 'success',
                message: 'Product removed from cart successfully',
                data: result
            });
        }

        product.qty -= 1;
        await product.save();
        const result = await CartModel.find();
        res.status(200).json({
            status: 'success',
            message: 'Product quantity decreased successfully',
            data: result
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: err.message
        });
    }
};

const cartDeleteData = async (req, res) => {
    const ID = req.params.id;
        console.log("id",ID);
    try {
        const product = await CartModel.findByIdAndDelete({ _id: ID });

        if (product) {
            const result = await CartModel.find();
            return res.status(200).json({
                status: 'success',
                message: 'Product removed from cart successfully',
                data: result
            });
        }else{
            return res.status(404).json({
                status: 'error',
                message: 'Product not found',
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: err.message
        });
    }
};


module.exports = { cartDecreaseQuantity, cartGetData, cartIncreaseQuantity, cartPostData,cartDeleteData }