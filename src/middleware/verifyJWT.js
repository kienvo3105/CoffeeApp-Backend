const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    // Lấy token từ tiêu đề yêu cầu (hoặc từ cookie, tùy bạn triển khai)
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Không tìm thấy token.' });
    }

    // Xác thực token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token không hợp lệ.' });
        }

        // Nếu xác thực thành công, bạn có thể lưu thông tin người dùng trong req để sử dụng trong controller tiếp theo (nếu cần)
        req.user = user;

        // Cho phép điều hướng tiếp theo
        next();
    });
}

module.exports = verifyJWT;