/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import express from "express"

/* ---------------------------- internal imports ---------------------------- */
import AuthController from "../controllers/auth"
import isAuth from "../middleware/is-auth";
import validate from "../middleware/validation";
import { authValidation } from "../schema/auth";

const router = express.Router();

router.get("/user", isAuth, AuthController.getUserById);
router.post("/register", validate(authValidation), AuthController.createUser);
router.post("/login", validate(authValidation), AuthController.authenticateUser);

export default router;
