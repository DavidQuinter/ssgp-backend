import { Router } from "express";
import { admin} from "../../auth/middlewares/auth.middlewares.js";
import { userDataController, userPersonalInformationController } from "../controllers/user.controller.js";


const router = Router();

router.get('/user/data', admin , userDataController);
router.get('/user/personal-information',admin, userPersonalInformationController);

export default router;