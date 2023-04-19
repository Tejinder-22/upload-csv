


import multer from "multer";
import csvtojson from "csvtojson";
import bodyParser from 'body-parser';
import conn from "./db.js"
import path from "path"
import express from 'express';
const __dirname = path.resolve();
const app = express();
const port = 3000;
conn();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import agent  from  "./router/agentRouter.js";
import policy  from  "./router/policyRouter.js";
import user  from  "./router/userRouter.js";
import userAccount from "./router/userAccountRouter.js"
app.use("/api/v1",agent);
app.use("/api/v1",policy);
app.use("/api/v1",user);
app.use("/api/v1",userAccount);

import userModel from './model/userModel.js';
import policyModel from './model/policyModel.js';
import agentModel from './model/agentModel.js';
import userAccountModel from "./model/userAccountModel.js";

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './uploads/')
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    )
  },
})

var upload = multer({
  storage: storage,
})
const lookupData = {};
app.post('/upload', upload.single('file'), async (req, res) => {
  csvtojson()
    .fromFile(__dirname + '/uploads/' + req.file.filename)
    .then((json) => {
      var policy_id;
      var agent_id;
      json.forEach(async (data) => {
        if(data){
         if (!(data.agent in lookupData)) {
          console.log("running first time");
          lookupData[data.agent] = 1;
          var agentData = { agent_name: data.agent, userType: data.userType }
          const response = await agentModel.create(agentData);
           agent_id = response._id;
        }
        if (!(data.email in lookupData)) {
          lookupData[data.email] = 1;
          var userData = { firstname: data.firstname, email: data.email, city: data.city, phone: data.phone, address: data.address, dob: data.dob }
          await userModel.create(userData);
        }
        if (!(data.policy_number in lookupData)) {
          lookupData[data.policy_number] = 1;
          var policyData = { agent_name: data.agent, policy_number: data.policy_number, policy_mode: data.policy_mode, policy_type: data.policy_type, policy_start_date: data.policy_start_date, policy_end_date: data.policy_end_date }
          const response = await policyModel.create(policyData);
           policy_id = response._id;
        }
        if (!(data.firstname in lookupData)) {
          lookupData[data.firstname] = 1;
          var userAccountData = { firstname: data.firstname, account_name: data.account_name, account_type: data.account_type, phone: data.phone, agent_id: agent_id, policy_id: policy_id }
          await userAccountModel.create(userAccountData);
        }
      }
      });
      // Send response to client
      res.send({
        success: true,
        message: 'Data Updated Successfully'
      });

    }).catch((e) => {
      console.log(e);
      res.send({
        success: false,
        error: e
      })
    })
});

app.listen(port, () => {
  console.log(`app listen at http://${port}`);
})