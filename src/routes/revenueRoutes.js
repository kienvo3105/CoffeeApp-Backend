import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT";
import revenueController from "../controllers/revenueController";

const router = Router();

const initRevenueRoute = (app) => {
    router.get("/revenue-month/branch/:id", revenueController.getRevenueMonthByBranch);

    return app.use('/api/v1/revenue', router);
}

export default initRevenueRoute;