import {
  userDataService,
  userPersonalInformationService,
} from "../service/user.service.js";

export const userDataController = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "Usuario no autenticado" });
    }

    const dataUser = await userDataService(userId);
    res.status(200).json(dataUser);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los datos del usuario" });
  }
};

export const userPersonalInformationController = async (req, res) => {
  try {
    const userId = req.userId;
    const userPersonalInformation = await userPersonalInformationService(
      userId
    );
    res.status(200).json(userPersonalInformation);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al obtener la información personal del usuario" });
  }
};
