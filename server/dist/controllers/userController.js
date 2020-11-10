"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const jwt = __importStar(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
require("../auth/passportHandler");
const user_1 = require("../models/user");
const secrets_1 = require("../util/secrets");
const uuid_1 = require("uuid");
class UserController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email_id, password } = req.body;
            const hashedPassword = bcrypt_nodejs_1.default.hashSync(password, bcrypt_nodejs_1.default.genSaltSync(10));
            var user = yield user_1.User.findOne({ email_id: email_id });
            if (user && user.email_id) {
                return res.status(201).send({ status: false, message: "Email Id already exists!" });
            }
            yield user_1.User.create({
                name: name,
                email_id: email_id,
                password: hashedPassword,
                reset_token: ""
            });
            const token = jwt.sign({ email_id: email_id }, secrets_1.JWT_SECRET);
            res.status(200).send({ status: true, token: token, name });
        });
    }
    authenticateUser(req, res, next) {
        passport_1.default.authenticate("local", function (err, user, info) {
            if (err)
                return next(err);
            if (!user) {
                return res.status(200).json({ status: false, code: "unauthorized", message: info.message });
            }
            else {
                const token = jwt.sign({ email_id: user.email_id }, secrets_1.JWT_SECRET);
                res.status(200).send({ status: true, token: token, name: user.name });
            }
        })(req, res, next);
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email_id } = req.body;
            var token = uuid_1.v4();
            var user = yield user_1.User.findOne({ email_id: email_id });
            if (user && user.email_id) {
                user.reset_token = token;
                user.save();
                // Pass token Just for demo purpose otherwise we will use email to send a link along with token
                return res.status(201).send({ status: true, message: "Reset link sent to your email id!", token });
            }
            else {
                return res.status(201).send({ status: false, message: "Account not found!" });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email_id, token, password } = req.body;
            const hashedPassword = bcrypt_nodejs_1.default.hashSync(password, bcrypt_nodejs_1.default.genSaltSync(10));
            var user = yield user_1.User.findOne({ email_id: email_id });
            if (user && user.email_id) {
                if (user.reset_token && user.reset_token == token) {
                    user.reset_token = "";
                    user.password = hashedPassword;
                    user.save();
                    return res.status(201).send({ status: true, message: "Password change successfully!" });
                }
                else {
                    return res.status(201).send({ status: false, message: "Invalid reset link!" });
                }
            }
            else {
                return res.status(201).send({ status: false, message: "Account not found!" });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map