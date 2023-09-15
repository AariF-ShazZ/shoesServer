const { OrderModel } = require("../models/Orders.model");



const orderPostData = async (req, res) => {
    const data = req.body
    try {
            const product = new OrderModel(data);
            await product.save();
            const result = await OrderModel.find();
            res.status(201).json({
                status: 'success',
                message: 'Place order successfully',
                data: result
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: err
        });
    }
};

const orderGetData = async (req, res) => {
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

module.exports = { orderGetData,orderPostData }