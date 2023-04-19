import ApiFeatures from '../utils/ApiFeatures.js';
import agentModel from '../model/agentModel.js';
const addAgent = async (req, res) => {
    let response = { success: false };
    try {
        var agent = await agentModel.create(req.body);
    } catch (e) {
        response = { success: false, error: e }
        return res.status(500).json(response)
    }

    response.success = true;
    response.data = agent;
    res.status(200).json(response)
}

const getAgent = async (req, res) => {
    let response = { success: false };
    var resultPerPage = 5;
    var obj = new ApiFeatures(agentModel.find(), req.query).pagination(resultPerPage);
    if (req.query.id) {
        obj = new ApiFeatures(agentModel.find({ _id: req.query.id }), req.query).pagination(resultPerPage)
    }
    try {
        var agents = await obj.query;
    } catch (error) {
        response = { success: false, error: error }
        return res.status(500).json(response)
    }
    response.success = true;
    response.data = agents;
    res.status(200).json(response)
}

const deleteAgent = async (req, res) => {
    let response = { success: false };
    try {
        var agentDelete = await agentModel.deleteOne({ _id: req.query.id });
    } catch (error) {
        response = { success: false, error: error }
        return res.status(500).json(response)
    }

    response.success = true;
    response.data = agentDelete;
    res.status(200).json(response)
}

const updateAgent = async (req, res) => {
    let response = { success: false };
    let reqBody = req.body;
    try {
        var agentUpdate = await agentModel.findOneAndUpdate({ _id: req.query.id },   {agent_name : reqBody.agent_name  , userType: reqBody.userType  });
    } catch (error) {
        response = { success: false, error: error }
        return res.status(500).json(response)
    }

    response.success = true;
    response.data = agentUpdate;
    res.status(200).json(response)
}
export default { addAgent, getAgent, deleteAgent, updateAgent };