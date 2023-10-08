import db from '../models/index'

const createNewCategory = async (data) => {
    const { image, name, sizeL, sizeM, sizeS } = data;
    if (!image || !name || !sizeL || !sizeM || !sizeS)
        return { errorCode: 1, messageError: "image, name and price size are required!" };

    const category = await db.Category.create(data);

    await Promise.all([
        db.CategorySize.create({
            SizeId: "s_S",
            CategoryId: category.id,
            additionalPrice: sizeS
        }),
        db.CategorySize.create({
            SizeId: "s_M",
            CategoryId: category.id,
            additionalPrice: sizeM
        }),
        db.CategorySize.create({
            SizeId: "s_L",
            CategoryId: category.id,
            additionalPrice: sizeL
        }),
    ]);


    return { errorCode: 0, messageError: "add category success!" };
}

const getAllCategory = async () => {
    const allCategory = await db.Category.findAll({
        include: [{
            model: db.Size,
        }],
        order: [[db.Size, "name", "DESC"]],
        nest: true,
        raw: true,
    })

    const result = filterAllCategory(allCategory)

    return { errorCode: 0, messageError: "ok", allCategory: result };
}

const filterAllCategory = (allCategory) => {
    const outputData = [];

    allCategory.forEach(item => {
        const existingItem = outputData.find(outputItem => outputItem.id === item.id);
        if (existingItem) {
            // Nếu mục đã tồn tại, thêm thông tin về kích thước vào mảng kích thước của mục đó
            existingItem.Sizes.push({
                name: item.Sizes.name,
                additionalPrice: item.Sizes.CategorySize.additionalPrice
            });
        } else {
            // Nếu mục chưa tồn tại, tạo một mục mới với thông tin cơ bản và mảng kích thước
            outputData.push({
                id: item.id,
                name: item.name,
                image: item.image,
                Sizes: [{
                    name: item.Sizes.name,
                    additionalPrice: item.Sizes.CategorySize.additionalPrice
                }]
            });
        }
    });

    return outputData
}

const getOneCategory = async (categoryId) => {
    if (!categoryId)
        return { errorCode: 1, messageError: "categoryId is required" };

    const category = await db.Category.findAll({
        where: { id: categoryId },
        include: [{
            model: db.Size,
        },],
        nest: true,
        raw: true,
    })

    if (!category.length)
        return { errorCode: 2, messageError: "categoryId not found" };
    const result = filterCategory(category)

    return { errorCode: 0, messageError: "ok", category: result };
}

const filterCategory = (category) => {
    const sizeCategory = category.map((item) => { return { name: item.Sizes.name, additionalPrice: item.Sizes.CategorySize.additionalPrice } });
    const createNewCategory = {
        id: category[0].id,
        name: category[0].name,
        image: category[0].image,
        size: sizeCategory
    }
    return createNewCategory
}

export default {
    createNewCategory,
    getAllCategory,
    getOneCategory
}