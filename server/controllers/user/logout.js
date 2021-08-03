/** LOGOUT
 *  Gets the user's specific session token and removes it from MongoDB.
 */

module.exports = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token != req.token
    );
    await req.user.save();
  } catch (error) {
    res.status(500).send(error);
  }
};
