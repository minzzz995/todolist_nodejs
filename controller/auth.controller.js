const authController = {}
const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

authController.authenticate = (req, res, next) => {
    try {
        const tokenString = req.headers.authorization;
        console.log("Token string:", tokenString); // 토큰 확인

        if (!tokenString || !tokenString.startsWith('Bearer ')) {
            throw new Error("invalid token");
        }

        const token = tokenString.replace("Bearer ", "");
        
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if (error) {
                console.log("JWT verify error:", error); // JWT 에러 확인
                throw new Error("invalid token");
            }
            console.log("payload", payload)

            req.userId = payload._id
            next(); 
        });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

module.exports = authController;