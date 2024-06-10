import { getUser, getUserPersonalInformation } from "../models/user.models.js";

export const userDataService = async (userId) => {
  try {
    const userData = await getUser(userId);
    return userData;
  } catch (err) {
    throw new Error(err);
  }
};
export const userPersonalInformationService = async (userId) => {
  try {
    const userPersonalInformation = await getUserPersonalInformation(userId);
    return userPersonalInformation;
  } catch (err) {
    throw new Error(err);
  }
};

