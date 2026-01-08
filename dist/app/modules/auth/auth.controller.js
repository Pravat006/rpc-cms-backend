"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.updateUser = exports.getMe = exports.refreshTokens = exports.logout = exports.loginAsAdmin = exports.loginUser = exports.registerUser = void 0;
const utils_1 = require("../../utils");
const user_model_1 = require("../user/user.model");
const auth_validation_1 = require("./auth.validation");
const cloudinary_1 = require("../../config/cloudinary");
const interface_1 = require("../../interface");
const http_status_1 = __importDefault(require("http-status"));
const user_interface_1 = require("../user/user.interface");
const ApiError = (0, interface_1.getApiErrorClass)("AUTH");
const ApiResponse = (0, interface_1.getApiResponseClass)("AUTH");
exports.registerUser = (0, utils_1.asyncHandler)(async (req, res) => {
    const { name, password, phone, email } = auth_validation_1.registerValidation.parse(req.body);
    // Check if user already exists
    const existingUser = await user_model_1.User.findOne({
        $or: [{ phone }, ...(email ? [{ email }] : [])]
    });
    if (existingUser) {
        throw new ApiError(http_status_1.default.BAD_REQUEST, "User already registered with this phone or email.");
    }
    // Create new user with ACTIVE status
    const user = new user_model_1.User({
        name,
        password,
        phone,
        email,
        status: user_interface_1.UserStatus.ACTIVE
    });
    await user.save();
    // Remove sensitive fields
    const { password: _, ...userObject } = user.toJSON();
    res
        .status(http_status_1.default.CREATED)
        .json(new ApiResponse(http_status_1.default.CREATED, "User registered successfully.", userObject));
    return;
});
exports.loginUser = (0, utils_1.asyncHandler)(async (req, res) => {
    const { phoneOrEmail, password } = auth_validation_1.loginValidation.parse(req.body);
    const user = await user_model_1.User.findOne({
        $or: [{ phone: phoneOrEmail }, { email: phoneOrEmail }]
    });
    if (!user || user.isDeleted) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (user.status !== user_interface_1.UserStatus.ACTIVE) {
        throw new ApiError(http_status_1.default.BAD_REQUEST, "User account is not active");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError(http_status_1.default.BAD_REQUEST, "Invalid password");
    }
    const { accessToken, refreshToken } = (0, utils_1.generateTokens)(user);
    const { password: _, ...userObject } = user.toJSON();
    const isProd = process.env.NODE_ENV === 'production';
    res.
        cookie('accessToken', accessToken, { httpOnly: true, maxAge: 1000 * 15 * 60, secure: isProd, sameSite: isProd ? 'none' : 'lax' }).
        cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7, secure: isProd, sameSite: isProd ? 'none' : 'lax' })
        .json(new ApiResponse(http_status_1.default.OK, "User logged in successfully", { user: userObject, accessToken, refreshToken }));
    return;
});
exports.loginAsAdmin = (0, utils_1.asyncHandler)(async (req, res) => {
    const { phoneOrEmail, password } = auth_validation_1.loginValidation.parse(req.body);
    const user = await user_model_1.User.findOne({
        $or: [{ phone: phoneOrEmail }, { email: phoneOrEmail }]
    });
    if (!user || user.isDeleted) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (user.role !== user_interface_1.UserRole.ADMIN) {
        throw new ApiError(http_status_1.default.BAD_REQUEST, "You do not have permission to perform this action");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError(http_status_1.default.BAD_REQUEST, "Invalid password");
    }
    const { accessToken, refreshToken } = (0, utils_1.generateTokens)(user);
    const { password: _, ...userObject } = user.toJSON();
    const isProd = process.env.NODE_ENV === 'production';
    res.
        cookie('accessToken', accessToken, { httpOnly: true, maxAge: 1000 * 15 * 60, secure: isProd, sameSite: isProd ? 'none' : 'lax' }).
        cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 2, secure: isProd, sameSite: isProd ? 'none' : 'lax' })
        .json(new ApiResponse(http_status_1.default.OK, "Admin logged in successfully", { ...userObject }));
    return;
});
exports.logout = (0, utils_1.asyncHandler)(async (req, res) => {
    res.clearCookie('accessToken').clearCookie('refreshToken').json(new ApiResponse(http_status_1.default.OK, "Logged out successfully"));
    return;
});
exports.refreshTokens = (0, utils_1.asyncHandler)(async (req, res) => {
    const refreshToken = req.cookies.refreshToken || req.headers.authorization?.replace('Bearer ', '');
    if (!refreshToken) {
        throw new ApiError(http_status_1.default.BAD_REQUEST, "Refresh token not provided");
    }
    const decodedToken = (0, utils_1.verifyToken)(refreshToken);
    if (!decodedToken) {
        throw new ApiError(http_status_1.default.BAD_REQUEST, "Invalid refresh token");
    }
    const user = await user_model_1.User.findById(decodedToken.userId);
    if (!user) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "User not found");
    }
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = (0, utils_1.generateTokens)(user);
    const isProd = process.env.NODE_ENV === 'production';
    res.
        cookie('accessToken', newAccessToken, { httpOnly: true, maxAge: 1000 * 15 * 60, secure: isProd, sameSite: isProd ? 'none' : 'lax' }).
        cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * (user.role === 'admin' ? 2 : 7), secure: isProd, sameSite: isProd ? 'none' : 'lax' })
        .json(new ApiResponse(http_status_1.default.OK, "Tokens refreshed successfully", { accessToken: newAccessToken, refreshToken: newRefreshToken }));
    return;
});
exports.getMe = (0, utils_1.asyncHandler)(async (req, res) => {
    const userId = req.user?._id;
    const user = await user_model_1.User.findById(userId, { password: 0 });
    if (!user) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "User not found");
    }
    res.status(http_status_1.default.OK).json(new ApiResponse(http_status_1.default.OK, "User profile retrieved successfully", user));
    return;
});
exports.updateUser = (0, utils_1.asyncHandler)(async (req, res) => {
    const userId = req.user?._id;
    const validatedData = auth_validation_1.updateUserValidation.parse(req.body);
    const user = await user_model_1.User.findById(userId);
    if (!user) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (validatedData.email && validatedData.email.length > 0) {
        const existingUser = await user_model_1.User.findOne({
            email: validatedData.email,
            _id: { $ne: userId }
        });
        if (existingUser) {
            throw new ApiError(http_status_1.default.BAD_REQUEST, "Email already exists");
        }
    }
    if (validatedData.email === '') {
        delete validatedData.email;
    }
    if (req.file) {
        const cloudinaryResult = await (0, utils_1.uploadToCloudinary)(req.file.buffer, 'ram-pharma-users');
        // @ts-ignore
        validatedData.img = cloudinaryResult.secure_url;
        if (user.img) {
            const publicId = user.img.split("/").pop()?.split(".")[0];
            if (publicId)
                await cloudinary_1.cloudinary.uploader.destroy(`ram-pharma-users/${publicId}`);
        }
    }
    const updatedUser = await user_model_1.User.findByIdAndUpdate(userId, validatedData, { new: true, select: '-password' });
    if (!updatedUser) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "User not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "User updated successfully", updatedUser));
    return;
});
exports.updatePassword = (0, utils_1.asyncHandler)(async (req, res) => {
    const userId = req.user?._id;
    const { currentPassword, newPassword } = auth_validation_1.updatePasswordValidation.parse(req.body);
    const user = await user_model_1.User.findById(userId);
    if (!user) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "User not found");
    }
    const isPasswordCorrect = await user.comparePassword(currentPassword);
    if (!isPasswordCorrect) {
        throw new ApiError(http_status_1.default.BAD_REQUEST, "Incorrect password");
    }
    user.password = newPassword;
    await user.save();
    res.json(new ApiResponse(http_status_1.default.OK, "Password reset successfully"));
    return;
});
//# sourceMappingURL=auth.controller.js.map