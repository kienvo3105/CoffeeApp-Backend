import category from '../models/category';
import db from '../models/index'

const createNewCategory = async (data) => {
    const { image, name, sizeL, sizeM, sizeS } = data;
    if (!image || !name)
        return { errorCode: 1, messageError: "image and name are required!" };

    const category = await db.Category.create(data);

    await Promise.all([
        db.CategorySize.create({
            SizeId: "s_L",
            CategoryId: category.id,
            additionalPrice: sizeL
        }),
        db.CategorySize.create({
            SizeId: "s_M",
            CategoryId: category.id,
            additionalPrice: sizeM
        }),
        db.CategorySize.create({
            SizeId: "s_S",
            CategoryId: category.id,
            additionalPrice: sizeS
        })
    ]);


    return { errorCode: 0, messageError: "add category success!" };
}

const getAllCategory = async () => {
    const allCategory = await db.Category.findAll({
        include: [{
            model: db.Size,
        },],
        nest: true,
        raw: true,
    })

    const result = filterAllCategory(allCategory)

    return { errorCode: 0, messageError: "ok", data: result };
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

export default {
    createNewCategory,
    getAllCategory
}