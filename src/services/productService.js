import db from "../models";
const { Sequelize, DataTypes, Op, where } = require('sequelize');

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
    const products = await db.Product.findAll({ where: { categoryId }, attributes: { exclude: ['CategoryId'] }, });

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

const getBestSellerProduct = async () => {
    const products = await db.OrderDetail.findAll({
        attributes: ['productId', [Sequelize.fn('sum', Sequelize.col('quantity')), 'totalQuantity']],
        group: ['productId'],
        include: [{
            model: db.Product,
            include: [{
                model: db.Category,
                attributes: {
                    exclude: ['id', 'name', 'image']
                },
                include: [{
                    model: db.Size,
                }]
            }],
        }],
        order: [[Sequelize.col('totalQuantity'), 'DESC']], // Sử dụng tên cột gốc 'totalQuantity' ở đây
        limit: 5,
        nest: true,
        raw: true,
    });



    const newProducts = formatBestSellerProduct(products);

    return { errorCode: 0, messageSuccess: "OK", products: newProducts }
}

const formatBestSellerProduct = (data) => {
    const newData = [];
    data.forEach(item => {
        const existingItem = newData.find(product => product.id === item.productId)
        if (existingItem) {
            const { Sizes } = item.Product.Category;
            if (existingItem.sizeList[existingItem.sizeList.length - 1].name < Sizes.name)
                existingItem.sizeList.unshift({
                    id: Sizes.id,
                    name: Sizes.name,
                    additionalPrice: Sizes.CategorySize.additionalPrice
                })
            else
                existingItem.sizeList.push({
                    id: Sizes.id,
                    name: Sizes.name,
                    additionalPrice: Sizes.CategorySize.additionalPrice
                })
        }
        else {
            const { id, name, price, describe, image, Category } = item.Product;
            newData.push({
                id,
                name,
                price,
                describe,
                image,
                sizeList: [{
                    id: Category.Sizes.id,
                    name: Category.Sizes.name,
                    additionalPrice: Category.Sizes.CategorySize.additionalPrice
                }]
            })
        }

    });

    return newData;
}

const searchProduct = async (keyword) => {
    const products = await db.Product.findAll({
        where: {
            // Use the table alias to specify the 'name' column in the 'Product' table
            'Product.name': Sequelize.where(
                Sequelize.fn("lower", Sequelize.col("Product.name")),
                "like",
                "%" + keyword + "%"
            ),
        },
        attributes: {
            exclude: ['CategoryId']
        },
        include: [{
            model: db.Category,
            attributes: {
                exclude: ['id', 'name', 'image']
            },
            include: [{
                model: db.Size,
            }]
        }],
        nest: true,
        raw: true,
    });

    const newProducts = formatSearchProduct(products);

    return { errorCode: 0, messageSuccess: "OK", products: newProducts }
}

const formatSearchProduct = (data) => {
    let newData = [];
    data.forEach(item => {
        const existingItem = newData.find(product => product.id === item.id)
        if (existingItem) {
            const { Sizes } = item.Category;
            if (existingItem.sizeList[existingItem.sizeList.length - 1].name < Sizes.name)
                existingItem.sizeList.unshift({
                    id: Sizes.id,
                    name: Sizes.name,
                    additionalPrice: Sizes.CategorySize.additionalPrice
                })
            else
                existingItem.sizeList.push({
                    id: Sizes.id,
                    name: Sizes.name,
                    additionalPrice: Sizes.CategorySize.additionalPrice
                })
        }
        else {
            const { id, name, price, describe, image, Category } = item;
            newData.push({
                id,
                name,
                price,
                describe,
                image,
                sizeList: [{
                    id: Category.Sizes.id,
                    name: Category.Sizes.name,
                    additionalPrice: Category.Sizes.CategorySize.additionalPrice
                }]
            })
        }
    })
    return newData;
}

export default {
    createNewProduct,
    getProductByCategory,
    getOneProduct,
    getBestSellerProduct,
    searchProduct
}