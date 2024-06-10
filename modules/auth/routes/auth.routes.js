/**
 * Routas a las acciones get, post de el modulo de autenticación.
 * @module auth/routes
 * @author David Quintero <davidquinterocentro@hotmail.com>
 */
import { Router } from "express";
import { signupController, loginController, requestPasswordResetController, resetPasswordController } from "../controllers/auth.controller.js";

const router = Router();

/**
 * Ruta POST para registrar un nuevo usuario.
 * @name post/signup
 * @function
 * @memberof module:auth/routes
 * @inner
 * @param {object} req - objeto de solicitud de Express.
 * @param {object} res - objeto de respuesta de Express.
 * @return {Promise<void>}
 */

router.post('/signup', signupController);

/**
 * Ruta POST para iniciar sesión de un usuario.
 * @name post/login
 * @function
 * @memberof module:auth/routes
 * @inner
 * @param {object} req - objeto de solicitud de Express.
 * @param {object} res - objeto de respuesta de Express.
 * @return {Promise<void>}
 */
router.post('/login', loginController);


// ...
router.post('/request-password-reset', requestPasswordResetController);
router.post('/reset-password/:resetToken', resetPasswordController);

export default router;