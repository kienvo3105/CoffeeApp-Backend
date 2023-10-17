import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT";
import productController from "../controllers/productController";

const router = Router();

const initProductRoute = (app) => {
    router
        .route("/category/:categoryId")
        .get(productController.getProductByCategory);

    router.get("/best-seller", productController.getBestSellerProduct);

    router.get("/search", productController.searchProduct)

    router
        .route("/:id")
        .get(productController.getOneProduct)
    //     .patch(verifyJWT, branchController.updateBranch)
    //     .delete(verifyJWT, branchController.deleteBranch);


    router
        .route("/")
        .post(productController.createNewProduct);
    return app.use('/api/v1/product', router);
}


export default initProductRoute;