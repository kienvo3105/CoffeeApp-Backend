import db from "../models";

const createNewProduct = async (data) => {
    const { categoryId, name, price, describe, image } = data;
    if (!categoryId || !name || !price || !describe || !image)
        return { errorCode: 1, messageError: "categoryId,name,price,describe,image are required!" };

    await db.Product.create(data);
    return { errorCode: 0, messageSuccess: 'Create new product success!' };
}


const getProductByCategory = async (categoryId) => {
    if (!categoryId)
        return { errorCode: 1, messageSuccess: 'categoryId is required!' };
    const products = await db.Product.findAll({ where: { categoryId } });

    return { errorCode: 0, messageSuccess: "ok", products }
}

const getOneProduct = async (id) => {
    if (!id)
        return { errorCode: 1, messageError: " id is require" }
    const product = await db.Product.findOne({ where: { id } });
    if (!product)
        return { errorCode: 2, messageError: "not found" }
    return { errorCode: 0, messageSuccess: "ok", product }
}

export default {
    createNewProduct,
    getProductByCategory,
    getOneProduct
}