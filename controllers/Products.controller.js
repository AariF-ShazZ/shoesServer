const { ProductsModel } = require("../models/Products.model")

const getAllData = async (req, res) => {
    try {
        const result = await ProductsModel.find();
        res.status(200).json({
            success: true,
            message: "Successfully fetched data",
            productResult: result.length,
            Result: result
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}


const singleData = async (req, res) => {
    const ID = req.params.id;
    console.log("data => ", ID);
    try {
        const result = await ProductsModel.findById({ _id: ID });

        if (result) {
            res.status(200).json({
                success: true,
                data: result,
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Product with id ${ID} not found`,
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

const postData = async (req, res) => {
    const data = req.body;
    try {
        const product = new ProductsModel(data);
        await product.save();

        const savedProducts = await ProductsModel.find();

        res.status(201).json({
            success: true,
            message: 'Product successfully created',
            data: savedProducts
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: err.message
        });
    }
};

const getData = async (req, res) => {
    const query = req.query;
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const sortDirection = query.sort === 'desc' ? -1 : 1;
    try {
        let filter = {};

        if (query.gender) {
            const genders = Array.isArray(query.gender) ? query.gender : [query.gender];
            filter.gender = { $in: genders };
        }

        const result = await ProductsModel.find(filter)
            .sort({ final_price: sortDirection })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            data: result,
            size: result.length,
            page: page,
            itemsPerPage: limit
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateData = async (req, res) => {
    const ID = req.params.id;
    const payload = req.body;
    try {
        const updatedProduct = await ProductsModel.findByIdAndUpdate(ID, payload, { new: true });

        if (updatedProduct) {
            const remainingData = await ProductsModel.find();
            res.status(200).json({
                message: `Updated the Product whose id is ${ID}`,
                data: remainingData,
            });
        } else {
            res.status(404).json({ message: `Product with id ${ID} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const deleteData = async (req, res) => {
    const ID = req.params.id;

    try {
        const deletedProduct = await ProductsModel.findByIdAndDelete({ _id: ID });

        if (deletedProduct) {
            const remainingData = await ProductsModel.find();

            res.status(200).json({
                message: `Deleted the Product whose id is ${ID}`,
                remainingData: remainingData,
                remainingDataSize: remainingData.length,
            });
        } else {
            res.status(404).json({ message: `Product with id ${ID} not found` });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { postData, getData, updateData, deleteData, getAllData, singleData }