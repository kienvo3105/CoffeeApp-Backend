const asyncHandler = require("express-async-handler");
import db from "../models";
const path = require('path');
const admin = require('firebase-admin');
import AppError from "../utils/appError";
import { Sequelize } from "sequelize";

const registerNotification = asyncHandler(async (req, res, next) => {
    const { userId, tokenId } = req.body;


    // Kiểm tra xem đã có thông báo đăng ký cho user chưa
    const notification = await db.Notification.findOne({ where: { userId } });

    if (notification) {
        return res.status(200).json({
            status: 'success',
            data: {
                message: 'Token already registered!',
            },
        });
    }

    // Nếu chưa có thông báo cho user, tạo một thông báo mới
    try {
        await db.Notification.create({
            userId,
            tokenId,
            notifications: [],
            data: {}
            // Các trường khác của thông báo
        });

        return res.status(201).json({
            status: 'success',
            data: {
                message: 'Token registered successfully!',
            },
        });
    } catch (error) {
        return next(new AppError('Failed to register token', 500));
    }
});

const updateNotification = asyncHandler(async (req, res, next) => {
    const userId = req?.query?.userId;

    // Tìm thông báo dựa trên userId
    const notification = await db.Notification.findOne({ where: { userId } });
    // Kiểm tra xem có thông báo cho userId hay không
    if (!notification) {
        return next(new AppError('No Document Found', 404));
    }

    // Thực hiện cập nhật thông báo dựa trên dữ liệu trong req.body
    try {
        // const updatedNotification =
        await db.Notification.update(
            { ...req.body }, // Dữ liệu cần cập nhật (ví dụ: { field1: value1, field2: value2 })
            { where: { userId } } // Điều kiện tìm kiếm bản ghi cần cập nhật
        );
        // if (updatedNotification[0] === 1) {
        //     // 1 bản ghi đã được cập nhật
        //     return res.status(200).json({
        //         status: 'success',
        //         data: {
        //             message: 'Notification updated successfully!',
        //         },
        //     });
        // } else {
        //     // Không có bản ghi nào được cập nhật
        //     return next(new AppError('No document found with that ID', 404));
        // }
        return res.status(200).json({
            status: 'success',
            data: {
                message: 'Notification updated successfully!',
            },
        });
    } catch (error) {
        return next(new AppError('Failed to update notification', 500));
    }
});

const sendNotification = asyncHandler(async (req, res, next) => {
    try {
        const { title, body, navigate, tokenId, image, userId, data } = req.body;

        // Tìm thông báo dựa trên userId
        const notification = await db.Notification.findOne({ where: { userId } });

        // Kiểm tra xem có thông báo cho userId hay không
        if (!notification) {
            return next(new AppError('No Such User with Notifications Object Found', 404));
        }

        // Xây dựng đối tượng thông báo (notification) để gửi đi
        const notificationData = {
            title: title || 'Results Are Ready!',
            body: body || 'Click here to view your results',
            // data: {
            //     navigate: navigate || 'Xray',
            //     image: image || 'default',
            //     data: data || null,
            // },
            // android: {
            //     smallIcon: 'logo_circle',
            //     channelId: 'default',
            //     importance: 4,
            //     pressAction: {
            //         id: 'default',
            //     },
            // actions: [
            //     {
            //         title: 'Mark as Read',
            //         pressAction: {
            //             id: 'read',
            //         },
            //     },
            // ],
            // },
        };

        notification.notifications = JSON.parse(notification.notifications)
        notification.notifications.push(notificationData);
        // Cập nhật thông báo trong cơ sở dữ liệu
        await db.Notification.update(
            {
                data: notificationData,
                // notifications: Sequelize.literal(`array_append("notifications", '${JSON.stringify(notificationData)}'::json)`)
                notifications: notification.notifications
            },
            { where: { userId } }
        );

        // Gửi thông báo đến thiết bị với tokenID
        // Thực hiện bằng cách gọi hàm gửi thông báo đến thiết bị tương ứng với Sequelize
        // ...
        await admin.messaging().sendMulticast({
            tokens: [tokenId],
            data: {
                notifee: JSON.stringify(notificationData),
            },
        });

        // await admin.messaging().sendEachForMulticast({
        //     tokens: [tokenId],
        //     data: {
        //         notifee: JSON.stringify(notificationData),
        //     },
        // });

        // await admin.messaging().send({
        //     data: {
        //         notifee: JSON.stringify("asv"),
        //     },
        //     apns: {
        //         payload: {
        //             aps: {
        //                 contentAvailable: true,
        //             },
        //         },
        //         headers: {
        //             'apns-push-type': 'background',
        //             'apns-priority': '5',
        //             'apns-topic': '', // your app bundle identifier
        //         },
        //     },
        //     token: tokenId,
        // })

        return res.status(200).json({ message: 'Successfully sent notifications!' });
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message || 'Something went wrong!' });
    }
});

const getNotifications = asyncHandler(async (req, res, next) => {
    const { userId } = req.query;

    // Tìm thông báo dựa trên userId
    const notification = await db.Notification.findOne({ where: { userId } });

    // Kiểm tra xem có thông báo cho userId hay không
    if (!notification) {
        return next(new AppError('No Such User with Notifications Object Found', 404));
    }

    return res.status(200).json({
        status: 'success',
        obj: notification,
    });
});

export default {
    registerNotification,
    updateNotification,
    sendNotification,
    getNotifications
}