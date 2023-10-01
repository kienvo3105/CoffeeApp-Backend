import { Router } from "express";
import userController from "../controllers/userController";
import authController from "../controllers/authController";

const router = Router();

const initAuthRoute = (app) => {

    router.post("/", authController.adminLogin);
    router.get("/refresh", authController.adminRefresh);


    router.post("/logout", authController.logout);
    router.post("/register", userController.register);
    router.post("/userLogin", authController.userLogin);

    router.post("/managerLogin", authController.managerLogin);

    return app.use('/api/v1/auth', router);
}


export default initAuthRoute;