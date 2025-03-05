const sendResponse = (res, status, success, message, data = null) => {
    res.status(status).json({
        success,
        message,
        data,
    });
};

const response = {
    success (res, message = "Requête réussie", data = null, status = 200) {
        sendResponse(res, status, true, message, data);
    },
    
    error (res, message = "Une erreur s'est produite", status = 500, data = null) {
        sendResponse(res, status, false, message, data);
    }
}


module.exports = response
