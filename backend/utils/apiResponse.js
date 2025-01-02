const apiResponse = {
    success: (res, message, data, statusCode = 200)=>{
        res.status(statusCode).json({
            success: true,
            message,
            data
        })
    },
    error: (res, message, data={}, statusCode = 400)=>{
        res.status(statusCode).json({
            success: false,
            message,
            data
        })
    }
}

export default apiResponse;