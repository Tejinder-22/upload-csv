 
import express from 'express';
const router = express.Router()
import userController from "../controller/userController.js"

router.route("/user").post(userController.addUser);
router.route("/user").get(userController.getUser);
router.route("/user").put(userController.updateUser);
router.route("/user").delete(userController.deleteUser);

export default router;