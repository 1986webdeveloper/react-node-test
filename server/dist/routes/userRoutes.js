"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
class UserRoutes {
    constructor() {
        this.userController = new userController_1.UserController();
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post("/register", this.userController.registerUser);
        this.router.post("/login", this.userController.authenticateUser);
        this.router.post("/reset", this.userController.resetPassword);
        this.router.post("/forgot", this.userController.forgotPassword);
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=userRoutes.js.map