import { Router } from "express";
import userController from "../controllers/userController";
import verifyJWT from "../middleware/verifyJWT";
import userAddressController from "../controllers/userAddressController";
const router = Router();

const initUserRoute = (app) => {
    // router.get("/", (req, res) => {
    //     return res.status(200).json("auth ok");
    // });

    router.get("/:id", verifyJWT, userController.getOneUser)
    // router.post("/userLogin", authController.userLogin)

    router
        .route("/:id/address")
        .get()
        .post(userAddressController.createNewUserAddress)
        .patch()
        .delete()

    return app.use('/api/v1/user', router);
}


export default initUserRoute;