/**
 * @author David Quintero <davidquinterocentro@hotmail.com>
 * @param {*} req
 * @param {*} res
 */

import { registerUser, loginUser, requestPasswordReset, resetPassword } from '../service/auth.service.js';

export const signupController = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;
    const newUser = await registerUser(user_name, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const loginController = async (req, res) => {
  const { user_name, password } = req.body;
  if (!user_name || !password) {
    return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridos' });
  }

  try {
    const token = await loginUser(user_name, password);
    console.log(token)
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000),
      path: '/',
    };
    res.cookie('jwt', token, cookieOptions);
    res.status(200).json({ message: 'Usuario autenticado correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const requestPasswordResetController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Correo electrónico es requerido' });
    }

    const resetToken = await requestPasswordReset(email);
    res.status(200).json({ message: 'Enlace de restablecimiento de contraseña enviado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { newPassword } = req.body;

    if (!resetToken || !newPassword) {
      return res.status(400).json({ error: 'Token de restablecimiento y nueva contraseña son requeridos' });
    }

    await resetPassword(resetToken, newPassword);
    res.status(200).json({ message: 'Contraseña restablecida correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};