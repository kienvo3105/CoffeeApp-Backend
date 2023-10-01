import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT";
import managerController from "../controllers/managerController";

const router = Router();

const initManagerRoute = (app) => {
    router
        .route("/register")
        .post(managerController.createNewManager);

    router
        .route("/")
        .get(managerController.getAllManager);

    // router
    //     .route("/:id")
    //     .get(branchController.getOneBranch)
    //     .patch(verifyJWT, branchController.updateBranch)
    //     .delete(verifyJWT, branchController.deleteBranch);


    return app.use('/api/v1/manager', router);
}


export default initManagerRoute;