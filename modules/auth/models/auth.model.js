import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUserByUsername = async (user_name) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        user_name,
      }
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (user_name, email, password) => {
  try {
    const user = await prisma.user.create({
      data: {
        user_name,
        email,
        password,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUserPassword = async (userId, newPassword) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const createPasswordResetToken = async (userId, token) => {
  try {
    const passwordReset = await prisma.password_reset.create({
      data: {
        user_id: userId,
        token,
      },
    });
    return passwordReset;
  } catch (error) {
    throw error;
  }
};

export const getPasswordResetToken = async (token) => {
  try {
    const passwordReset = await prisma.password_reset.findFirst({
      where: {
        token,
      },
    });
    return passwordReset;
  } catch (error) {
    throw error;
  }
};

export const deletePasswordResetToken = async (token) => {
  try {
    await prisma.password_reset.deleteMany({
      where: {
        token,
      },
    });
  } catch (error) {
    throw error;
  }
};