import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getParts = async () => {
    const parts = await prisma.product.findMany({
      select: {
        id: true,
        part: true,
        name: true,
        element_1_1: {
          select: {
            next_update: true,
          },
        },
        element_1_2: {
          select: {
            next_update: true,
          },
        },
        element_1_3: {
          select: {
            next_update: true,
          },
        },
        element_2: {
          select: {
            next_update: true,
          },
        },
        element_3: {
          select: {
            next_update: true,
          },
        },
        element_4: {
          select: {
            next_update: true,
          },
        },
        element_5: {
          select: {
            next_update: true,
          },
        },
        element_6: {
          select: {
            next_update: true,
          },
        },
        element_7: {
          select: {
            next_update: true,
          },
        },
        element_8: {
          select: {
            next_update: true,
          },
        },
        element_9: {
          select: {
            next_update: true,
          },
        },
        element_10: {
          select: {
            next_update: true,
          },
        },
        element_11: {
          select: {
            next_update: true,
          },
        },
        element_12: {
          select: {
            next_update: true,
          },
        },
        element_13: {
          select: {
            next_update: true,
          },
        },
        element_14: {
          select: {
            next_update: true,
          },
        },
        element_15: {
          select: {
            next_update: true,
          },
        },
        element_16: {
          select: {
            next_update: true,
          },
        },
        element_17: {
          select: {
            next_update: true,
          },
        },
        element_18_1: {
          select: {
            next_update: true,
          },
        },
        element_18_2: {
          select: {
            next_update: true,
          },
        },
      },
    });
  
    const partsWithStatus = parts.map((part) => {
      const elements = [
        ...(part.element_1_1 || []),
        ...(part.element_1_2 || []),
        ...(part.element_1_3 || []),
        ...(part.element_2 || []),
        ...(part.element_3 || []),
        ...(part.element_4 || []),
        ...(part.element_5 || []),
        ...(part.element_6 || []),
        ...(part.element_7 || []),
        ...(part.element_8 || []),
        ...(part.element_9 || []),
        ...(part.element_10 || []),
        ...(part.element_11 || []),
        ...(part.element_12 || []),
        ...(part.element_13 || []),
        ...(part.element_14 || []),
        ...(part.element_15 || []),
        ...(part.element_16 || []),
        ...(part.element_17 || []),
        ...(part.element_18_1 || []),
        ...(part.element_18_2 || []),
      ];
  
      let status = 1;
      const currentDate = new Date();
  
      for (const element of elements) {
        if (element.next_update <= currentDate) {
          status = 3;
          break;
        } else if (
          element.next_update <=
          new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000)
        ) {
          status = 2;
        }
      }
  
      return {
        id: part.id,
        part: part.part,
        name: part.name,
        status,
      };
    });
  
    return partsWithStatus;
  };

export const getPartById = async (id) => {
    const part = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        technical_information: {
          include: {
            grade: true,
            process_identifier: true,
          },
        },
        element_1_1: true,
        element_1_2: true,
        element_1_3: true,
        element_2: true,
        element_3: true,
        element_4: true,
        element_5: true,
        element_6: true,
        element_7: true,
        element_8: true,
        element_9: true,
        element_10: true,
        element_11: true,
        element_12: true,
        element_13: true,
        element_14: true,
        element_15: true,
        element_16: true,
        element_17: true,
        element_18_1: true,
        element_18_2: true,
      },
    });
  
    if (!part) {
      throw new Error("Parte no encontrada");
    }
  
    const elements = [
      ...(part.element_1_1 || []),
      ...(part.element_1_2 || []),
      ...(part.element_1_3 || []),
      ...(part.element_2 || []),
      ...(part.element_3 || []),
      ...(part.element_4 || []),
      ...(part.element_5 || []),
      ...(part.element_6 || []),
      ...(part.element_7 || []),
      ...(part.element_8 || []),
      ...(part.element_9 || []),
      ...(part.element_10 || []),
      ...(part.element_11 || []),
      ...(part.element_12 || []),
      ...(part.element_13 || []),
      ...(part.element_14 || []),
      ...(part.element_15 || []),
      ...(part.element_16 || []),
      ...(part.element_17 || []),
      ...(part.element_18_1 || []),
      ...(part.element_18_2 || []),
    ].filter(Boolean);
  
    return {
      id: part.id,
      name: part.name,
      description: part.description,
      part: part.part,
      technical_information: part.technical_information,
      elements,
    };
  };