import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT";
import productController from "../controllers/productController";

const router = Router();

const initProductRoute = (app) => {
    router
        .route("/category/:categoryId")
        .get(productController.getProductByCategory);

    router
        .route("/")
        .post(productController.createNewProduct);

    router
        .route("/:id")
        .get(productController.getOneProduct)
    //     .patch(verifyJWT, branchController.updateBranch)
    //     .delete(verifyJWT, branchController.deleteBranch);


    return app.use('/api/v1/product', router);
}


export default initProductRoute;