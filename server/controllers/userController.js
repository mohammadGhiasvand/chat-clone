const User = require('../model/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userNameCheck = await User.findOne({ username });
    if (userNameCheck) {
      return res.json({
        message:
          'The enterred username already exists! Please choose another username.',
        status: false,
      });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({
        message: 'The enterred email already exists!',
        status: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    console.log(error);
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.json({ message: 'Username not found!', status: false });
    }
    const isPassordValid = await bcrypt.compare(password, user.password);
    if (!isPassordValid) {
      res.json({ message: 'Password is not valid!', status: false });
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: true,
      image: avatarImage,
      status: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.params.id;
    const users = await User.find({ _id: { $ne: currentUserId } }).select([
      'email',
      'username',
      'avatarImage',
      '_id',
    ]);
    return res.json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
