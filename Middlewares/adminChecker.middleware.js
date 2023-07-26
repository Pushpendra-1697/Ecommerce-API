// **************** Middleware used for Checking Admin (or) User ****************

const adminChecker = (req, res, next) => {
    const { role } = req.headers;
    if (role == "admin") {
        next();
    } else {
        res.send({ "status": "NO", "msg": "You are not Admin" });
    }
};

module.exports = { adminChecker };