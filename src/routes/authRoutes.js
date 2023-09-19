import { Router } from "express";
import userController from "../controllers/userController";
const router = Router();

const initAuthRoute = (app) => {
    router.get("/", (req, res) => {
        return res.status(200).json("auth ok");
    });

    router.post("/register", userController.register)

    return app.use('/api/v1/auth', router);
}


export default initAuthRoute;