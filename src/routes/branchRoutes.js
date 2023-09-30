import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT";
import branchController from "../controllers/branchController";

const router = Router();

const initBranchRoute = (app) => {
    // router.get("/", (req, res) => {
    //     return res.status(200).json("auth ok");
    // });

    // router.post("/register", userController.register)
    // router.post("/userLogin", authController.userLogin)

    router
        .route("/")
        .get(branchController.getAllBranch)
        .post(verifyJWT, branchController.createNewBranch);

    router
        .route("/:id")
        .get(branchController.getOneBranch)
        .patch(verifyJWT, branchController.updateBranch)
        .delete(verifyJWT, branchController.deleteBranch);


    return app.use('/api/v1/branch', router);
}


export default initBranchRoute;