import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT";
import discountController from "../controllers/discountController";

const router = Router();

const initDiscountRoute = (app) => {
    router
        .route("/")
        .get(discountController.getAllDiscount)
        .post(discountController.createNewDiscount)

    router
        .route("/:id")
        .patch(discountController.useDiscountById)

    return app.use('/api/v1/discount', router);
}


export default initDiscountRoute;