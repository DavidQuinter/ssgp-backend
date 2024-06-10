import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUser = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select:{
        id: true,
        user_name : true,
        email : true,
        password: false,
        active : true
      }
    });
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

export const getUserPersonalInformation = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        user_name: true,
        email: true,
        user_information: {
          select: {
            name: true,
            last_name: true,
            title: true,
          },
        },
        user_location: {
          select: {
            location: {
              select: {
                factory_name: true,
                adress: true,
                country: {
                  select: {
                    name: true,
                  },
                },
                state: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return user;
  } catch (err) {
    throw new Error(err);
  }
};
