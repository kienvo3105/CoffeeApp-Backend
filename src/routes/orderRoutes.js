import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT";
import orderController from "../controllers/orderController";

const router = Router();

const initOrderRoute = (app) => {
    router
        .route("/user/:id")
        .get()
        .post(orderController.createNewOrder)

    router
        .route("/branch/:id")
        .get()
        .patch()




    return app.use('/api/v1/order', router);
}


export default initOrderRoute;