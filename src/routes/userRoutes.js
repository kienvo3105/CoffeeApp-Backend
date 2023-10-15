import { Router } from "express";
import userController from "../controllers/userController";
import verifyJWT from "../middleware/verifyJWT";
import userAddressController from "../controllers/userAddressController";
const router = Router();

const initUserRoute = (app) => {

    router
        .route("/:id")
        .get(verifyJWT, userController.getOneUser)
        .patch(userController.updateUser)
        .delete(userController.removeUser);


    router
        .route("/:id/address")
        .get()
        .post(userAddressController.createNewUserAddress)
        .patch()
        .delete()

    return app.use('/api/v1/user', router);
}


export default initUserRoute;