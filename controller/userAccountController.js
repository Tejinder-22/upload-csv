import ApiFeatures from '../utils/ApiFeatures.js';
import userAccountModel from '../model/userAccountModel.js';
const getUserAccount = async (req, res) => {
    let response = { success: false };
    var resultPerPage = 5;
    var match = {};
    if (req.query.id) {
         match = { _id: req.query.id }
    }
       const  obj = new ApiFeatures(userAccountModel.find(match), req.query).pagination(resultPerPage)
       await obj.query.populate('agent_id').populate('policy_id').exec((err, userAccount) => {
      if (err) {
        console.error(err);
        response = { success: false, error: err }
        return res.status(500).json(response)
      } else {
        console.log(userAccount);
        response.success = true;
        response.data = userAccount;
        res.status(200).json(response)
      }
    });  
}
export default {getUserAccount}