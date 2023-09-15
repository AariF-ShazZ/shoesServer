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
    try {
        const orders = await OrderModel.find();
        res.status(201).json({
            status: 'success',
            message: 'Get orders successfully',
            data: orders
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: err
        });
    }
};

module.exports = { orderGetData, orderPostData }