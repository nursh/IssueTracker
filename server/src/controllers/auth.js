/* eslint-disable */

function signupController(req, res) {
  const { email, password } = req.body;
  res.send({ message: `Tis' but a scratch.` });
}

export { signupController };
