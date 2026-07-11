import express from "express";
const router = express.Router();
import { body } from "express-validator";
import {
  allUsers,
  deleteUser,
  editUser,
  logOut,
  profile,
  signin,
  signup,
  singleUser,
} from "../controllers/userController";
import { validateRequest } from "../middleware/validateRequest";
import { isAdmin, isAuthenticated } from "../middleware/auth";

router.post(
  "/users/signup",
  [
    body("name")
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage("Name is required, at least 3 letters"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  signup
);

router.post(
  "/users/signin",
  [
    body("email").isEmail().withMessage("Email must valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password!"),
  ],
  validateRequest,
  signin
);

router.get("/users/me", isAuthenticated, profile);
router.get("/users", isAuthenticated, isAdmin, allUsers);
router.get("/users/:id", isAuthenticated, singleUser);
router.put("/users/admin/edit/:id", isAuthenticated, isAdmin, editUser);
router.put("/users/edit/:id", isAuthenticated, editUser);
router.delete("/users/admin/delete/:id", isAuthenticated, isAdmin, deleteUser);
router.post("/logout", logOut);

export { router as userRoutes };
