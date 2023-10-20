import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT";
import branchController from "../controllers/branchController";

const router = Router();

const initBranchRoute = (app) => {
    router
        .route("/")
        .get(branchController.getAllBranch)
        .post(branchController.createNewBranch);

    router.get("/search", branchController.searchBranch);

    router
        .route("/:id")
        .get(branchController.getBranchById)
        .patch(verifyJWT, branchController.updateBranch)
        .delete(verifyJWT, branchController.deleteBranch);


    return app.use('/api/v1/branch', router);
}


export default initBranchRoute;