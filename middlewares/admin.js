//admin midllewre
import jwt from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

export const adminMid = (req, res, next) => {
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

        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied: Admins only'
            });
        }

        next()
    } catch (error) {
        console.error(error.message);
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
}
