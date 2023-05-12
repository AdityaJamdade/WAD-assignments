const errHandler = (err, req, res, next) => {
    if(err){
        res.status(500).json({
            error: err.message,
            stack: err.stack
        })
    }
    next()
}

module.exports = errHandler