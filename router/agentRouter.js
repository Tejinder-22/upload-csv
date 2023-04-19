 
import express from 'express';
const router = express.Router()
import agentController from "../controller/agentController.js"

router.route("/agent").post(agentController.addAgent);
router.route("/agent").get(agentController.getAgent);
router.route("/agent").put(agentController.updateAgent);
router.route("/agent").delete(agentController.deleteAgent);

export default router;