"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
// import passportApiKey from "passport-headerapikey";
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_1 = require("../models/user");
const secrets_1 = require("../util/secrets");
const LocalStrategy = passport_local_1.default.Strategy;
const JwtStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
passport_1.default.use('local', new LocalStrategy({ usernameField: "email_id" }, (username, password, done) => {
    user_1.User.findOne({ email_id: username.toLowerCase() }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(undefined, false, { message: `Email id not found.` });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid email id or password." });
        });
    });
}));
passport_1.default.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secrets_1.JWT_SECRET
}, function (jwtToken, done) {
    user_1.User.findOne({ email_id: jwtToken.email_id }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(undefined, user, jwtToken);
        }
        else {
            return done(undefined, false);
        }
    });
}));
//# sourceMappingURL=passportHandler.js.map