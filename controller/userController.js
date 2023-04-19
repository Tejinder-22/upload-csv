import ApiFeatures from '../utils/ApiFeatures.js';
import userModel from '../model/userModel.js';
const addUser = async (req, res) => {
    let response = { success: false };
    try {
        var user = await userModel.create(req.body);
    } catch (e) {
        response = { success: false, error: e }
        return res.status(500).json(response)
    }
    response.success = true;
    response.data = user;
    res.status(200).json(response)
}

const getUser = async (req, res) => {
    let response = { success: false };
    var resultPerPage = 5;
    var obj = new ApiFeatures(userModel.find(), req.query).pagination(resultPerPage);
    if (req.query.id) {
        obj = new ApiFeatures(userModel.find({ _id: req.query.id }), req.query).pagination(resultPerPage)
    }
    try {
        var users = await obj.query;
    } catch (error) {
        response = { success: false, error: error }
        return res.status(500).json(response)
    }
    response.success = true;
    response.data = users;
    res.status(200).json(response)
}

const updateUser = async (req, res) => {
    let response = { success: false };
    let reqBody = req.body;
    try {
        var userUpdate = await userModel.findOneAndUpdate({ _id: req.query.id },  {firstname : reqBody.firstname, email: reqBody.email, city : reqBody.city, phone : reqBody.phone  , address : reqBody.address, dob : reqBody.dob });
    } catch (error) {
        response = { success: false, error: error }
        return res.status(500).json(response)
    }
    response.success = true;
    response.data = userUpdate;
    res.status(200).json(response)
}

const deleteUser = async (req, res) => {
    let response = { success: false };
    try {
        var userDelete = await userModel.deleteOne({ _id: req.query.id });
    } catch (error) {
        response = { success: false, error: error }
        return res.status(500).json(response)
    }
    response.success = true;
    response.data = userDelete;
    res.status(200).json(response)
}
export default { addUser, getUser, deleteUser, updateUser };