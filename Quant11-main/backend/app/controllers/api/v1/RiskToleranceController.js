const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const { UserModel } = require("../../../models");

const addUserExperiance = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { risk_appetite, trade_experience } = req.validatedData;

    // Find the user based on user_id
    const user = await UserModel.findById(user_id);

    if (!user) {
      // Handle the case where the user is not found
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.DATA_NOT_FOUND
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    // Update the user profile fields
    user.risk_appetite = risk_appetite;
    user.trade_experience = trade_experience;

    // Save the updated user
    await user.save();

    const updatedRiskToleranceData = {
      risk_appetite: user.risk_appetite,
      trade_experience: user.trade_experience,
    };

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      updatedRiskToleranceData,
      STATUS_MESSAGES.ADD
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("error occured while adding user experience " + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = { addUserExperiance };
