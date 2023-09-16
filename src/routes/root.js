import { Router } from "express";

const router = Router();

const initRootRoute = (app) => {
    router.get("/", (req, res) => {
        return res.status(200).json("ok");
    });

    return app.use('/', router);
}


export default initRootRoute;