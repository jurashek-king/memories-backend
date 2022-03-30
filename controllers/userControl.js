import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import newUser from '../models/userModel.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await newUser.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'test',
      { expiresIn: '1h' }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  const { firstName, lastName, email, password, repeatedPasswd } = req.body;

  try {
    const existingUser = await newUser.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      console.log("Existing user");
      return res.status(400).json({ message: 'User already exist.' });
    }
    if (password !== repeatedPasswd) {
      console.log("Passwd error");
      return res.status(400).json({ message: "Passwords don't match" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const createdUser = newUser.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: createdUser.email, id: createdUser._id }, 'test', {
      expiresIn: '1h',
    });
    res.status(200).json({ result: createdUser , token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
