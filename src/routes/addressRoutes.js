import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT";
import AddressController from "../controllers/addressController";

const router = Router();

const initAddressRoute = (app) => {
    router
        .route("/")
        .get(AddressController.getAllAddress)
        .post(AddressController.createNewAddress);

    router
        .route("/:id")
        .get(AddressController.getOneAddress)
        .patch(verifyJWT, AddressController.updateAddress)
        .delete(verifyJWT, AddressController.deleteAddress);

    return app.use('/api/v1/address', router);
}


export default initAddressRoute;