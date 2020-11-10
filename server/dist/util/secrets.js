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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.MONGODB_URI = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + "/../../.env" });
exports.MONGODB_URI = process.env["MONGODB_URI"];
if (!exports.MONGODB_URI) {
    console.log("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}
exports.JWT_SECRET = process.env["JWT_SECRET"];
if (!exports.JWT_SECRET) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map