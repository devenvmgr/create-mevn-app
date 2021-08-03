/** SIGNUP
 *  Parses the data from the request and saves a new user to MongoDB.
 */

const { User } = require("../../models");

module.exports = async (req, res) => {
  try {
    const user = new User(req.body.newUser);
    await user.save();
    res.status(201).send({
      ok: true,
      message: "Creating your account...",
      user,
      token: await user.generateAuthToken(),
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ ok: false, message: e });
  }
};
