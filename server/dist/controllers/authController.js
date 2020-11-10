"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const passport_1 = __importDefault(require("passport"));
require("../auth/passportHandler");
class AuthController {
    authenticateJWT(req, res, next) {
        passport_1.default.authenticate("jwt", function (err, user, info) {
            if (err) {
                console.log(err);
                return res.status(200).json({ status: false, code: "unauthorized" });
            }
            if (!user) {
                return res.status(200).json({ status: false, code: "unauthorized" });
            }
            else {
                return next();
            }
        })(req, res, next);
    }
    authorizeJWT(req, res, next) {
        passport_1.default.authenticate("jwt", function (err, user, jwtToken) {
            if (err) {
                console.log(err);
                return res.status(200).json({ status: false, code: "unauthorized" });
            }
            if (!user) {
                return res.status(200).json({ status: false, code: "unauthorized" });
            }
            else {
                return next();
            }
        })(req, res, next);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map