import ApiFeatures from '../utils/ApiFeatures.js';
import policyModel from '../model/policyModel.js';
const addPolicy = async (req, res) => {
    let response = { success: false };
    try {
        var policy = await policyModel.create(req.body);
    } catch (e) {
        response = { success: false, error: e }
        return res.status(500).json(response)
    }

    response.success = true;
    response.data = policy;
    res.status(200).json(response)
}

const getPolicy = async (req, res) => {
    let response = { success: false };
    var resultPerPage = 5;
    var obj = new ApiFeatures(policyModel.find(), req.query).pagination(resultPerPage);
    if (req.query.id) {
        obj = new ApiFeatures(policyModel.find({ _id: req.query.id }), req.query).pagination(resultPerPage)
    }
    try {
        var policies = await obj.query;
    } catch (error) {
        response = { success: false, error: error }
        return res.status(500).json(response)
    }
    response.success = true;
    response.data = policies;
    res.status(200).json(response)
}

const updatePolicy = async (req, res) => {
    let response = { success: false };
    let reqBody = req.body;
    try {
        var policyUpdate = await policyModel.findOneAndUpdate({ _id: req.query.id },  {agent_name : reqBody.agent_name , policy_number: reqBody.policy_number  ,policy_mode : reqBody.policy_mode  , policy_type : reqBody.policy_type  , policy_start_date : reqBody.policy_start_date  ,policy_end_date : reqBody.policy_end_date  });
    } catch (error) {
        response = { success: false, error: error }
        return res.status(500).json(response)
    }
    response.success = true;
    response.data = policyUpdate;
    res.status(200).json(response)
}

const deletePolicy = async (req, res) => {
    let response = { success: false };
    try {
        var policyDelete = await policyModel.deleteOne({ _id: req.query.id });
    } catch (error) {
        response = { success: false, error: error }
        return res.status(500).json(response)
    }
    response.success = true;
    response.data = policyDelete;
    res.status(200).json(response)
}


export default { addPolicy, getPolicy, deletePolicy, updatePolicy };