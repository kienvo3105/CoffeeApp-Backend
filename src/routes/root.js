import { Router } from "express";
import db from '../models/index'

const router = Router();

const initRootRoute = (app) => {
    router.get("/", (req, res) => {
        return res.status(200).json("ok");
    });

    router.get("/getUser", async (req, res) => {
        try {
            const data = await db.User.findAll();
            return res.status(200).json(data);
        } catch (e) {
            console.log("🚀 ~ file: root.js:16 ~ router.get ~ e:", e)
        }
    })

    return app.use('/', router);
}


export default initRootRoute;