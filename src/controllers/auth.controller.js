import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config.js';
import User from '../models/user.model.js';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Ya existe un usuario con el mismo correo electrónico' });
    }

    // Crear un nuevo usuario                                   
    const hashedPassword = await bcrypt.hash(password, 10);// 434erg554gfdfgh56fgh56yubv
    
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    
    // Generar un token de acceso 
    const accessToken = jwt.sign({ userId: newUser._id }, TOKEN_SECRET);

    res.cookie("token", accessToken);

    // Enviar una respuesta al cliente que se guarda en el header de la pagina
    res.status(201).json({"Usuario Creado":newUser, accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al registrar el usuario' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el correo electrónico y la contraseña son correctos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email inválido' });
    }
                                                  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password inválido' });
    }

    // Generar un token de acceso
    const accessToken = jwt.sign({ userId: user._id }, TOKEN_SECRET);

    res.cookie("token", accessToken);

    // Enviar una respuesta al cliente
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al iniciar sesión' });
  }
};


export const logout = async (req, res) => {
  res.cookie("token", "", {
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
