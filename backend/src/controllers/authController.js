import authService from '../services/authService.js';

const sendToken = (user, statusCode, res) => {
  const token = authService.createToken(user.id);

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  user.password = undefined; // Hide password
  res.status(statusCode).json({ status: 'success', token, data: { user } });
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await authService.checkExistingUser(email, username);
    const user = await authService.createUser(username, email, password);
    sendToken(user, 201, res);
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
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success', message: 'Logged out successfully' });
};

export { signup, login, logout };