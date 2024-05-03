const userModel = require("../models/userModel");

const createUser = async (req, res) => {
  // console.log(req.body);

  const { name, phoneNumber, email } = req.body;

  if (!name || !phoneNumber || !email) {
    return res.json({
      success: false,
      message: "Please Enter all fields",
    });
  }
  try {
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.json({
        status: false,
        message: "User Already Exists!",
      });
    }

    const newUser = new userModel({
      name: name,
      phoneNumber: phoneNumber,
      email: email,
    });

    await newUser.save();

    res.json({
      success: true,
      message: "User Created Sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { createUser };
