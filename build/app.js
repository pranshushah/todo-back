"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var google_1 = require("./routes/auth/google");
var twitter_1 = require("./routes/auth/twitter");
var keys_1 = require("./config/keys");
var no_routes_error_1 = require("./errors/no_routes_error");
var errorHandler_1 = require("./middleware/errorHandler");
var currentUser_logout_1 = require("./routes/auth/currentUser_logout");
var app = express_1.default();
exports.app = app;
app.use(express_1.default.json());
app.use(cookie_session_1.default({
    maxAge: 300 * 24 * 60 * 60 * 1000,
    keys: [keys_1.cookieKey],
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(google_1.googleLogin);
app.use(twitter_1.twitterLogin);
app.use(currentUser_logout_1.currentUser_logout);
app.all('*', function () {
    throw new no_routes_error_1.NoRouteError();
});
app.use(errorHandler_1.errorHandler);
