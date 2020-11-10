"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
exports.userSchema = new mongoose_1.Schema({
    name: String,
    email_id: String,
    password: String,
    reset_token: String
});
exports.userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt_nodejs_1.default.compare(candidatePassword, this.password, (err, isMatch) => {
        callback(err, isMatch);
    });
};
exports.User = mongoose_1.model("User", exports.userSchema);
//# sourceMappingURL=user.js.map