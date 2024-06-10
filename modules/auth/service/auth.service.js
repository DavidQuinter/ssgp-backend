import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { getUserByUsername, getUserByEmail, createUser, updateUserPassword, createPasswordResetToken, getPasswordResetToken, deletePasswordResetToken } from '../models/auth.model.js';
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = async (user_name, email, password) => {
  try {
    const existingUser = await getUserByUsername(user_name);
    if (existingUser) {
      throw new Error('El nombre de usuario ya está en uso');
    }
    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
      throw new Error('El correo electrónico ya está en uso');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(user_name, email, hashedPassword);
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const loginUser = async (user_name, password) => {
  try {
    const existingUser = await getUserByUsername(user_name);
    console.log(existingUser)
    if (!existingUser) {
      throw new Error('Usuario no encontrado');
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }
    const token = jsonwebtoken.sign(
      { id: existingUser.id, user_name: existingUser.user_name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    return token;
  } catch (error) {
    console.log("es aquí")
    throw new Error(error);
  }
};
export const requestPasswordReset = async (email) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const resetToken = jsonwebtoken.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    await createPasswordResetToken(user.id, resetToken);
    return resetToken;
  } catch (error) {
    throw new Error(error);
  }
};

export const resetPassword = async (resetToken, newPassword) => {
  try {
    const passwordResetToken = await getPasswordResetToken(resetToken);
    if (!passwordResetToken) {
      throw new Error('Token de restablecimiento de contraseña inválido');
    }

    const decodedToken = jsonwebtoken.verify(resetToken, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(userId, hashedPassword);
    await deletePasswordResetToken(resetToken);
  } catch (error) {
    throw new Error(error);
  }
};