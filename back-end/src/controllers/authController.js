import AuthService from "../services/authServices.js";

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async signup(req, res) {
    try {
      const { email, password, firstname, lastname, username, address, telephone, theme, profilePicture } = req.body;
      if (!email || !password || !firstname || !lastname || !username) {
        res.status(400).json({ error: true, message: "Missing required fields" });
        return;
      }
      const userData = { 
        email, 
        password, 
        firstname, 
        lastname, 
        username,
        address: address || null,
        telephone: telephone || null,
        theme: theme || 'light',
        profilePicture: profilePicture || null
      };
      const { user, token } = await this.authService.signup(userData);
      res.send({ user, token });
    } catch (err) {
      console.error("POST auth/signup, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).end();
        return;
      }
      const token = await this.authService.signin(email, password);
      res.status(200).json({ token });
    } catch (err) {
      console.error("POST auth/signin, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

  async getCurrentUser(req, res) {
    const defaultReturnObject = { authenticated: false, user: null };
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json(defaultReturnObject);
      }
      
      const token = authHeader.replace("Bearer ", "");
      const user = await this.authService.getCurrentUser(token);
      res.status(200).json({ authenticated: true, user });
    } catch (err) {
      console.error("GET auth/me, Something Went Wrong:", err);
      res.status(400).json(defaultReturnObject);
    }
  }

  async refreshToken(req, res) {
  const defaultReturnObject = { authenticated: false };
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json(defaultReturnObject);
    }
    
    const token = authHeader.replace("Bearer ", "");
    const { newToken, user } = await this.authService.refreshToken(token);
    
    if (!newToken) {
      return res.status(401).json(defaultReturnObject);
    }
    
    res.status(200).json({ token: newToken, user });
  } catch (err) {
    console.error("POST auth/refresh, Something Went Wrong:", err);
    res.status(401).json(defaultReturnObject);
  }
}

async updateUser(req, res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: true, message: "Unauthorized" });
      }
      
      const token = authHeader.replace("Bearer ", "");
      const { email, firstname, lastname, username, address, telephone, theme, profilePicture } = req.body;
      
      const updatedUser = await this.authService.updateUser(token, { 
        email, 
        firstname, 
        lastname, 
        username, 
        address, 
        telephone, 
        theme, 
        profilePicture 
      });
      
      res.status(200).json({ success: true, user: updatedUser });
    } catch (err) {
      console.error("PUT auth/update, Something Went Wrong:", err);
      res.status(400).json({ error: true, message: err.message });
    }
  }
}

export default AuthController;