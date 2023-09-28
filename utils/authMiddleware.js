const authMiddleware = (req, res, next) => {
  if (req.session.user.login) {
    next();
  } else {
    res.status(401).send({ message: "Log in first" });
  }
};
module.exports = authMiddleware;
