import { getParts, getPartById } from "../models/part.model.js";

export const getPartsService = async () => {
  const parts = await getParts();
  return parts;
};
export const getPartByIdService = async (id) => {
  const part = await getPartById(id);
  return part;
};