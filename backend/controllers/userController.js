const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');

//load all users
exports.allUsers = async (req, res, next) => {

    const pageSize = 15;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();

    try {
        const users = await User.find().sort({ createdAt: -1 })
            .skip(pageSize * (page - 1))
            .limit(pageSize)

        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize),
            count
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}


//edit single user
exports.singleUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}


//edit user
exports.editUser = async (req, res, next) => {

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            user
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}

//delete user
exports.deleteUser = async (req, res, next) => {

    try {
        const user = await User.findByIdAndRemove(req.params.id, req.body);
        res.status(200).json({
            success: true,
            user
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}