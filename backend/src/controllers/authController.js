import authService from '../services/authService.js';

const sendToken = (user, statusCode, res) => {
  const token = authService.createToken(user.id);

  res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })

  user.password = undefined; // Hide password
  res.status(statusCode).json({ status: 'success', token, data: { user } });
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await authService.checkExistingUser(email, username);
    console.log("creating user");
    const user = await authService.createUser(username, email, password);
    res.status(200).json({status:'success', message:'User Created',data: user});
    //sendToken(user, 201, res);
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authService.validateUserCredentials(email, password);
    sendToken(user, 200, res);
  } catch (error) {
    res.status(401).json({ status: 'fail', message: error.message });
  }
};

const logout = (req, res) => {
  res.cookie('access_token', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success', message: 'Logged out successfully' });
};

export { signup, login, logout };