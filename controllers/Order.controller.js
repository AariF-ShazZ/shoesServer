const { OrderModel } = require("../models/Orders.model");



const orderPostData = async (req, res) => {
    const data = req.body;
    try {
      const product = await OrderModel.findOne({ userID: data.userID });
  
      if (!product) {
        const newData = new OrderModel(data);
        await newData.save();
        return res.status(201).json({
          status: 'success',
          message: 'Place order successfully',
        });
      }
      const updatedOrder = await OrderModel.findByIdAndUpdate(product._id, data, { new: true });
      await updatedOrder.save();
  
      return res.status(201).json({
        status: 'success',
        message: 'Place order updated successfully',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        error: err,
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