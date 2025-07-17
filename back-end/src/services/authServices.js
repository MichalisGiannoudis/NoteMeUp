import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../database/models/user.js";

// JWT config with potential runtime updates
const getJwtSecret = () => process.env.JWT_SECRET;
const getJwtExpiresIn = () => process.env.JWT_EXPIRES_IN || '24h';

export default class AuthService {

  async signup(signupRequest) {
    const { email, password, firstname, lastname } = signupRequest;
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    
    const hashedPassword = await bcrypt.hash(password, 8);
    const userData = {
      email,
      password: hashedPassword,
      firstname,
      lastname,
    };
    
    const user = await User.create(userData);
    if (!user) {
      throw new Error("CreateUser Failed");
    }
    
    const token = jwt.sign({ id: user.id, email: user.email }, getJwtSecret(), {
      expiresIn: getJwtExpiresIn(),
    });
    
    const userResponse = { ...user.toJSON() };
    delete userResponse.password;
    
    return { user: userResponse, token };
  }

  async signin(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid Email Or Password"); 
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Email Or Password");
    }
    
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      getJwtSecret(),
      { expiresIn: getJwtExpiresIn() }
    );
    return token;
  }

  async getCurrentUser(token) {
    const decoded = jwt.verify(token, getJwtSecret());
    const user = await User.findOne({ where: { email: decoded.email } });
    
    if (!user) {
      throw new Error("User not found");
    }
    
    const userResponse = { ...user.toJSON() };
    delete userResponse.password;
    return userResponse;  
  }

  async refreshToken(token) {
    try {
      const decoded = jwt.verify(token, getJwtSecret(), { ignoreExpiration: true });
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp > currentTimestamp) {
        const user = await User.findOne({ where: { id: decoded.id } });
        if (!user) {
          throw new Error("User not found");
        }
        
        const userResponse = { ...user.toJSON() };
        delete userResponse.password;
        
        return { newToken: token, user: userResponse };
      }
      
      const user = await User.findOne({ where: { id: decoded.id } });
      if (!user) {
        throw new Error("User not found");
      }
      
      const newToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        getJwtSecret(),
        { expiresIn: getJwtExpiresIn() }
      );
      
      const userResponse = { ...user.toJSON() };
      delete userResponse.password;
      
      return { newToken, user: userResponse };
    } catch (error) {

      if (error.name !== 'TokenExpiredError') {
        throw new Error("Invalid token");
      }
      
      try {
        const decodedWithoutVerification = jwt.decode(token);
        if (!decodedWithoutVerification || !decodedWithoutVerification.id) {
          throw new Error("Invalid token format");
        }
        
        const user = await User.findOne({ where: { id: decodedWithoutVerification.id } });
        if (!user) {
          throw new Error("User not found");
        }
        
        const newToken = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          getJwtSecret(),
          { expiresIn: getJwtExpiresIn() }
        );
        
        const userResponse = { ...user.toJSON() };
        delete userResponse.password;
        
        return { newToken, user: userResponse };

      } catch (innerError) {
        throw new Error("Token refresh failed");
      }
      
    }
  }

}