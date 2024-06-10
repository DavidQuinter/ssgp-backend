import { getPartsService, getPartByIdService  } from "../services/part.service.js";

export const getPartsController = async (req, res) => {
  try {
    const parts = await getPartsService();
    res.json(parts);
  } catch (error) {
    console.error("Error al obtener las partes:", error);
    res.status(500).json({ error: "Error al obtener las partes" });
  }
};
export const getPartByIdController = async (req, res) => {
    try {
      const { id } = req.params;
      const part = await getPartByIdService(id);
      res.json(part);
    } catch (error) {
      console.error("Error al obtener la parte:", error);
      res.status(500).json({ error: "Error al obtener la parte" });
    }
  };