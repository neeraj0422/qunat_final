const getCommonSuccessResponse = (status, data = null, message, token = "") => {
    if (token) {
        return {
            data,
            meta: {
                code: 1,
                status,
                message:message.trim(),
                token,
            },
        }
    } else {
        return {
            data,
            meta: {
                code: 1,
                status,
                message:message.trim(),
            },
        }
    }
}

const getCommonErrorResponse = (status, data = null, message) => {
    return {
        data,
        meta: {
            code: 0,
            status,
            message:message.trim(),
        },
    }
}

module.exports = {
    getCommonSuccessResponse,
    getCommonErrorResponse
}