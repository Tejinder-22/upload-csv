 
import express from 'express';
const router = express.Router()
import userAccountController from "../controller/userAccountController.js"
/* POPULATION FUNCTIONALITY GETTING DATA FROM DIFFRENT TABLES */
router.route("/userAccount").get(userAccountController.getUserAccount);

/*  REST CRUD OPERATIONS ARE SAME AS DONE FOR OTHERS  */


export default router;