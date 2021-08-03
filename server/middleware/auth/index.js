/** AUTH
 *  Authorization middleware for protected routes.
 *  Decodes the user's ID from the token and searches MongoDB.
 */
const auth = async (req, res, next) => {
  const { User } = require("../../models");
  const token = req.headers.authorization.split(" ")[1]; // Express headers are auto converted to lowercase
  require("jsonwebtoken").verify(
    token,
    process.env.TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.json({
          auth: false,
          message: "You are not logged in.",
          err,
        });
      }
      try {
        const user = await User.findOne({
          _id: decoded._id,
          "tokens.token": token,
        });
        if (!user) {
          throw new Error();
        }
        req.user = user;
        req.token = token;
        res.json({
          auth: true,
          message: "You are logged in.",
          user,
        });
        next();
      } catch (error) {
        console.log(error);
      }
    }
  );
};

module.exports = auth;
