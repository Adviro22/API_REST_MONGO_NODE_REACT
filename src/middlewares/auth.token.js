import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config.js';
import User from '../models/user.model.js';

const authenticateToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(req)
    if (!token) return res.status(401).json({ message: "token no autorizado" });
    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) return res.status(401).json({ message: "Token no valido" });
      req.user = user;
      next();
   });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default authenticateToken;
