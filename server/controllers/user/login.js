/** LOGIN
 *  Parses the data from the request and uses it to look up account info in MongoDB.
 *  If successful, a JSON Web Token is generated, signed, and sent back to the user.
 *  If unsuccessful, an error is sent back.
 */

const { User } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token, message: "Logging in..." });
  } catch (e) {
    res.status(400).send({
      ok: false,
      message: "Please double-check your credentials.",
    });
  }
};
