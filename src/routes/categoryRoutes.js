import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT";
import categoryController from "../controllers/categoryController";
const router = Router();

const initCategoryRoute = (app) => {
    router
        .route("/")
        .get(categoryController.getAllCategory)
        .post(categoryController.createNewCategory);

    // router
    //     .route("/:id")
    //     .get(AddressController.getOneAddress)
    //     .patch(verifyJWT, AddressController.updateAddress)
    //     .delete(verifyJWT, AddressController.deleteAddress);


    return app.use('/api/v1/category', router);
}


export default initCategoryRoute;