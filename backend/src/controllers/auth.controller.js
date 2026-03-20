import { User } from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../services/token.service.js";

// REGISTER
export const registerUser = async (req, res) => {
    try{
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
        message: "User registered successfully",
        user
    });
    }catch(err){
        console.log("Error", err);
    }
};

// LOGIN
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.isPasswordCorrect(password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
    });

    res.json({
        accessToken,
        user: {
            id: user._id,
            email: user.email
        }
    });
};

// REFRESH TOKEN
export const refreshAccessToken = async (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) return res.status(401).json({ message: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decoded.id);

        const newAccessToken = generateAccessToken(user);

        res.json({ accessToken: newAccessToken });
    } catch (err) {
        res.status(403).json({ message: "Invalid refresh token" });
    }
};

// LOGOUT
export const logoutUser = async (req, res) => {
    await User.findByIdAndUpdate(req.user.id, { refreshToken: null });

    res.clearCookie("refreshToken");

    res.json({ message: "Logged out successfully" });
};