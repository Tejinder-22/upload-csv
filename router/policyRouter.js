 
import express from 'express';
const router = express.Router()
import policyController from "../controller/policyController.js"

router.route("/policy").post(policyController.addPolicy);
router.route("/policy").get(policyController.getPolicy);
router.route("/policy").put(policyController.updatePolicy);
router.route("/policy").delete(policyController.deletePolicy);

export default router;