import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT";
import orderController from "../controllers/orderController";

const router = Router();

const initOrderRoute = (app) => {

    router
        .route("/:id")
        .get(orderController.getOrderDetailById)
        .patch(orderController.updateOrder)

    router
        .route("/user/:id")
        .get(orderController.getOrderByUser)
        .post(orderController.createNewOrder)

    router
        .route("/history/user/:id")
        .get(orderController.getOrderHistoryByUser)

    router
        .route("/branch/:branchId")
        .get(orderController.getOrderByBranch)
        .patch()




    return app.use('/api/v1/order', router);
}


export default initOrderRoute;