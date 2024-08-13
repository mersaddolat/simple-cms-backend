const { default: mongoose } = require("mongoose")

module.exports = {
    validateId: (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send({
            status: 404,
            message: "There is no such a data with provided id",
            data: {},
            errors: []
        });
        next();
    },
    isValid: (id) => mongoose.Types.ObjectId.isValid(id)
}