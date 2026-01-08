import { asyncHandler, generateTokens, verifyToken, uploadToCloudinary } from "@/utils";
import { User } from "../user/user.model";
import { loginValidation, registerValidation, updatePasswordValidation, updateUserValidation } from "./auth.validation";
import { cloudinary } from "@/config/cloudinary";
import { getApiErrorClass, getApiResponseClass } from "@/interface";
import status from "http-status";
import { UserRole, UserStatus } from "../user/user.interface";

const ApiError = getApiErrorClass("AUTH");
const ApiResponse = getApiResponseClass("AUTH");

export const registerUser = asyncHandler(async (req, res) => {
  const { name, password, phone, email } = registerValidation.parse(req.body);

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ phone }, ...(email ? [{ email }] : [])]
  });

  if (existingUser) {
    throw new ApiError(
      status.BAD_REQUEST,
      "User already registered with this phone or email."
    );
  }

  // Create new user with ACTIVE status
  const user = new User({
    name,
    password,
    phone,
    email,
    status: UserStatus.ACTIVE
  });

  await user.save();

  // Remove sensitive fields
  const { password: _, ...userObject } = user.toJSON();

  res
    .status(status.CREATED)
    .json(
      new ApiResponse(
        status.CREATED,
        "User registered successfully.",
        userObject
      )
    );
  return;
});

export const loginUser = asyncHandler(async (req, res) => {
  const { phoneOrEmail, password } = loginValidation.parse(req.body);
  const user = await User.findOne({
    $or: [{ phone: phoneOrEmail }, { email: phoneOrEmail }]
  })
  if (!user || user.isDeleted) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }
  if (user.status !== UserStatus.ACTIVE) {
    throw new ApiError(status.BAD_REQUEST, "User account is not active");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(status.BAD_REQUEST, "Invalid password");
  }
  const { accessToken, refreshToken } = generateTokens(user);
  const { password: _, ...userObject } = user.toJSON();
  const isProd = process.env.NODE_ENV === 'production';
  res.
    cookie('accessToken', accessToken,
      { httpOnly: true, maxAge: 1000 * 15 * 60, secure: isProd, sameSite: isProd ? 'none' : 'lax' }).
    cookie('refreshToken', refreshToken,
      { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7, secure: isProd, sameSite: isProd ? 'none' : 'lax' })
    .json(new ApiResponse(status.OK, "User logged in successfully", { user: userObject, accessToken, refreshToken }));
  return;
});

export const loginAsAdmin = asyncHandler(async (req, res) => {
  const { phoneOrEmail, password } = loginValidation.parse(req.body);
  const user = await User.findOne({
    $or: [{ phone: phoneOrEmail }, { email: phoneOrEmail }]
  })
  if (!user || user.isDeleted) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  if (user.role !== UserRole.ADMIN) {
    throw new ApiError(status.BAD_REQUEST, "You do not have permission to perform this action");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(status.BAD_REQUEST, "Invalid password");
  }
  const { accessToken, refreshToken } = generateTokens(user);
  const { password: _, ...userObject } = user.toJSON();
  const isProd = process.env.NODE_ENV === 'production';
  res.
    cookie('accessToken', accessToken,
      { httpOnly: true, maxAge: 1000 * 15 * 60, secure: isProd, sameSite: isProd ? 'none' : 'lax' }).
    cookie('refreshToken', refreshToken,
      { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 2, secure: isProd, sameSite: isProd ? 'none' : 'lax' })
    .json(new ApiResponse(status.OK, "Admin logged in successfully", { ...userObject }));
  return;
});



export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('accessToken').clearCookie('refreshToken').json(new ApiResponse(status.OK, "Logged out successfully"));
  return;
});

export const refreshTokens = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.headers.authorization?.replace('Bearer ', '');
  if (!refreshToken) {
    throw new ApiError(status.BAD_REQUEST, "Refresh token not provided");
  }
  const decodedToken = verifyToken(refreshToken);
  if (!decodedToken) {
    throw new ApiError(status.BAD_REQUEST, "Invalid refresh token");
  }
  const user = await User.findById(decodedToken.userId);

  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(user);
  const isProd = process.env.NODE_ENV === 'production';
  res.
    cookie('accessToken', newAccessToken,
      { httpOnly: true, maxAge: 1000 * 15 * 60, secure: isProd, sameSite: isProd ? 'none' : 'lax' }).
    cookie('refreshToken', newRefreshToken,
      { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * (user.role === 'admin' ? 2 : 7), secure: isProd, sameSite: isProd ? 'none' : 'lax' })
    .json(new ApiResponse(status.OK, "Tokens refreshed successfully", { accessToken: newAccessToken, refreshToken: newRefreshToken }));
  return;
});

export const getMe = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const user = await User.findById(userId, { password: 0 });
  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  res.status(status.OK).json(new ApiResponse(status.OK, "User profile retrieved successfully", user));
  return;
});

export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const validatedData = updateUserValidation.parse(req.body);
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }
  if (validatedData.email && validatedData.email.length > 0) {
    const existingUser = await User.findOne({
      email: validatedData.email,
      _id: { $ne: userId }
    });

    if (existingUser) {
      throw new ApiError(status.BAD_REQUEST, "Email already exists");
    }
  }

  if (validatedData.email === '') {
    delete validatedData.email;
  }

  if (req.file) {
    const cloudinaryResult = await uploadToCloudinary(req.file.buffer, 'ram-pharma-users');
    // @ts-ignore
    validatedData.img = cloudinaryResult.secure_url;
    if (user.img) {
      const publicId = user.img.split("/").pop()?.split(".")[0];
      if (publicId) await cloudinary.uploader.destroy(`ram-pharma-users/${publicId}`);
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    validatedData,
    { new: true, select: '-password' }
  );

  if (!updatedUser) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  res.json(new ApiResponse(status.OK, "User updated successfully", updatedUser));
  return;
});

export const updatePassword = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { currentPassword, newPassword } = updatePasswordValidation.parse(req.body);

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }
  const isPasswordCorrect = await user.comparePassword(currentPassword)
  if (!isPasswordCorrect) {
    throw new ApiError(status.BAD_REQUEST, "Incorrect password");
  }
  user.password = newPassword;
  await user.save();

  res.json(new ApiResponse(status.OK, "Password reset successfully"));
  return;
});



