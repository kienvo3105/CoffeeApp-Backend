import { Router } from "express";
import notificationController from "../controllers/notificationController";

const router = Router();

const initNotificationRoute = (app) => {
    router
        .route('/')
        .get(notificationController.getNotifications)
        .post(notificationController.registerNotification)
        .patch(notificationController.updateNotification);

    router.post('/send', notificationController.sendNotification);




    return app.use('/api/v1/notification', router);
}


export default initNotificationRoute;