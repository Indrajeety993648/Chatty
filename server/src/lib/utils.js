import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });

    // Centralized cookie options
    const cookieOptions = {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true, // Prevents access via JavaScript (XSS protection)
        sameSite: 'strict', // Protects against CSRF attacks
        secure: process.env.NODE_ENV === 'production', // Only send cookies over HTTPS in production
    };

    // Set token as an HTTP-only cookie
    // res.cookie('token', token, cookieOptions);

    return token;
};
