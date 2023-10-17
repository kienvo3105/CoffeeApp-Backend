const asyncHandler = require("express-async-handler");
import productService from "../services/productService";


const createNewProduct = asyncHandler(async (req, res) => {
    const response = await productService.createNewProduct(req.body)

    if (response.errorCode !== 0)
        return res.status(401).json(response);
    return res.status(200).json(response);
})

const getProductByCategory = asyncHandler(async (req, res) => {
    const response = await productService.getProductByCategory(req.params.categoryId);
    if (response.errorCode !== 0)
        return res.status(401).json(response);
    return res.status(200).json(response);

})

const getOneProduct = asyncHandler(async (req, res) => {
    const response = await productService.getOneProduct(req.params.id);
    if (response.errorCode !== 0)
        return res.status(401).json(response);
    return res.status(200).json(response);

})

const getBestSellerProduct = asyncHandler(async (req, res) => {
    const response = await productService.getBestSellerProduct();
    if (response.errorCode !== 0)
        return res.status(401).json(response);
    return res.status(200).json(response);

})

const searchProduct = asyncHandler(async (req, res) => {
    const response = await productService.searchProduct(req.query.keyword);
    if (response.errorCode !== 0)
        return res.status(401).json(response);
    return res.status(200).json(response);

})

export default {
    createNewProduct,
    getProductByCategory,
    getOneProduct,
    getBestSellerProduct,
    searchProduct
}