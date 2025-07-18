import jwt from "jsonwebtoken";
import User from "../database/models/userModel.js";
import bcrypt from "bcryptjs";

const getJwtSecret = () => process.env.JWT_SECRET || 'your-secret-key';
const getJwtExpiresIn = () => process.env.JWT_EXPIRES_IN || '24h';

export default class AuthService {

  async signup(signupRequest) {
    const { email, password, firstname, lastname, username, address, telephone, theme, profilePicture } = signupRequest;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    
    if (username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        throw new Error("Username is already taken");
      }
    }
    
    const userData = {
      email,
      password,
      firstname,
      lastname,
      username,
      address,
      telephone,
      theme: theme || 'light',
      profilePicture
    };
    
    const user = await User.create(userData);
    
    const token = jwt.sign({ 
      id: user._id, 
      email: user.email,
      username: user.username
    }, getJwtSecret(), {
      expiresIn: getJwtExpiresIn(),
    });
    
    return { user, token };
  }

  async signin(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Email Or Password");
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid Email Or Password");
    }
    
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username
      },
      getJwtSecret(),
      { expiresIn: getJwtExpiresIn() }
    );
    
    return token;
  }

  async getCurrentUser(token) {
    try {
      const decoded = jwt.verify(token, getJwtSecret());
    
      const user = await User.findById(decoded.id);
      if (!user) {
        throw new Error("User not found");
      }
      
      return user;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  async refreshToken(token) {
    try {
      const decoded = jwt.verify(token, getJwtSecret(), { ignoreExpiration: true });
      const currentTimestamp = Math.floor(Date.now() / 1000);
      
      if (decoded.exp && decoded.exp > currentTimestamp) {
        const user = await User.findById(decoded.id);
        if (!user) {
          throw new Error("User not found");
        }
        
        return { newToken: token, user };
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        throw new Error("User not found");
      }
      
      const newToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
          username: user.username
        },
        getJwtSecret(),
        { expiresIn: getJwtExpiresIn() }
      );
      
      return { newToken, user };
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  async updateUser(token, userData) {
    try {
      const decoded = jwt.verify(token, getJwtSecret());
      
      const user = await User.findById(decoded.id);
      if (!user) {
        throw new Error("User not found");
      }
      
      if (userData.email && userData.email !== user.email) {
        const existingEmail = await User.findOne({ email: userData.email });
        if (existingEmail) {
          throw new Error("Email already in use");
        }
      }
      
      if (userData.username && userData.username !== user.username) {
        const existingUsername = await User.findOne({ username: userData.username });
        if (existingUsername) {
          throw new Error("Username already taken");
        }
      }
      
      const updatedFields = {};
      for (const [key, value] of Object.entries(userData)) {
        if (value !== undefined) {
          updatedFields[key] = value;
        }
      }
      
      const updatedUser = await User.findByIdAndUpdate(
        decoded.id,
        { $set: updatedFields },
        { new: true, runValidators: true }
      );
      
      return updatedUser;
    } catch (error) {
      throw new Error(error.message || "Invalid token");
    }
  }
}
