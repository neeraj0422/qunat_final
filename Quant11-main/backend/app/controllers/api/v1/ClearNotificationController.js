const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
    getCommonErrorResponse,
    getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const { NotificationModel } = require("../../../models");

const clearNotification = async (req, res) => {
    try {
        const { user_id } = req.user;

        // Update the notifications to mark them as read
        await NotificationModel.updateMany(
            { user_id: user_id, is_read: 0 },
            { $set: { is_read: 1 } }
        );

        const response = getCommonSuccessResponse(
            STATUS_CODES.SUCCESS,
            null,
            STATUS_MESSAGES.NOTIFICATION_MARKED_AS_READ
        );
        return res.status(STATUS_CODES.SUCCESS).json(response);
    } catch (error){
        console.log("Error occurred while clearing notification details:", error);
        const response = getCommonErrorResponse(
            STATUS_CODES.SERVER_ERROR,
            null,
            error.message || error
        );
        return res.status(STATUS_CODES.SERVER_ERROR).json(response);
    }
};

module.exports = {
    clearNotification,
};