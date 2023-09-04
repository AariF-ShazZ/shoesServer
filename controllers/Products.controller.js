const { ProductsModel } = require("../models/Products.model")


const postAllData = async (req, res) => {
    const data = req.body
    console.log("data => ",data);
    try {
        const result = await ProductsModel.insertMany(data);
        res.send(result);
    } catch (err) {
        res.send("error")
    }
}

const singleData = async (req, res) => {
    const ID = req.params.id
    console.log("data => ",ID);
    try {
        const result = await ProductsModel.findById({_id:ID});
        res.send(result);
    } catch (err) {
        res.send("error")
    }
}

const postData = async (req, res) => {
    const data = req.body
    try {
        const product = new ProductsModel(data)
        await product.save()
        res.send(data)
    } catch (err) {
        res.send({error:err})
    }
}
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
            .sort({ final_price: sortDirection }) // Sort by final_price
            .skip((page - 1) * limit) // Skip items on previous pages
            .limit(limit); // Limit the number of items per page

        res.send({
            "Filter Data Size":result.length,
            "Filter Data": result,
            "page": page,
            "itemsPerPage": limit
        });
    } catch (err) {
        res.send({ "error": err.message });
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