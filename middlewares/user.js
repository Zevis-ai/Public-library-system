import jwt from 'jsonwebtoken'

export const userMid = (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'not token'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;

        if (req.user.role !== 'user') {
            return res.status(403).json({
                success: false,
                message: 'Admin only'
            });
        }

        next()
    } catch (error) {
        console.error(error.message);
        return res.status(401).json({
            success: false,
            message: 'invalid token'
        });
    }
}