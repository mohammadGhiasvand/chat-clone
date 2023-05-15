const messageModel = require('../model/messageModel');
const bcrypt = require('bcrypt');

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, msg } = req.body;
    const data = await messageModel.create({
      message: { text: msg },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json({
        message: 'Message is successfully added to the DB',
        status: true,
      });
    }
    return res.json({
      message: 'Failed to add the message to the DB',
      status: false,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    return res.json(projectMessages);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
