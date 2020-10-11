"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var keys_1 = require("../config/keys");
var User_1 = require("../models/User");
var passport_twitter_1 = __importDefault(require("passport-twitter"));
var passport_1 = __importDefault(require("passport"));
var mockStrategy_1 = __importDefault(require("../config/mocks/mockStrategy"));
var twitterMockProfile_1 = require("../config/mocks/twitterMockProfile");
var database_connection_1 = require("../errors/database_connection");
var TwitterStrategy = passport_twitter_1.default.Strategy;
//callbackfunction for TwitterStrategy
function twitterDetailsCallback(accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function () {
        var existingUser, updatedExistingUser, user, newUser, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, User_1.User.findOne({ email: profile._json.email })];
                case 1:
                    existingUser = _b.sent();
                    if (!existingUser) return [3 /*break*/, 4];
                    if (!!existingUser.twitterId) return [3 /*break*/, 3];
                    return [4 /*yield*/, User_1.User.findOneAndUpdate({ email: existingUser.email }, { twitterId: profile._json.id_str }, { new: true })];
                case 2:
                    updatedExistingUser = _b.sent();
                    done(undefined, updatedExistingUser);
                    return [2 /*return*/];
                case 3:
                    //user has already signup so we will continue
                    done(undefined, existingUser);
                    return [2 /*return*/];
                case 4:
                    user = User_1.User.build({
                        twitterId: profile._json.id_str,
                        name: profile._json.screen_name,
                        email: profile._json.email,
                        imageURL: profile._json.profile_image_url_https,
                    });
                    return [4 /*yield*/, user.save()];
                case 5:
                    newUser = _b.sent();
                    done(undefined, newUser);
                    return [2 /*return*/];
                case 6: return [3 /*break*/, 8];
                case 7:
                    _a = _b.sent();
                    throw new database_connection_1.DatabaseConnectionError();
                case 8: return [2 /*return*/];
            }
        });
    });
}
function envStrategy() {
    var strategy;
    if (process.env.NODE_ENV === 'test') {
        strategy = new mockStrategy_1.default({ name: 'twitter', user: twitterMockProfile_1.twitterMockProfile }, 
        // @ts-ignore  (doing this because of user)
        twitterDetailsCallback);
    }
    else {
        strategy = new TwitterStrategy({
            consumerKey: keys_1.twitterAppId,
            consumerSecret: keys_1.twitterSecret,
            includeEmail: true,
            callbackURL: '/api/auth/twitter/callback',
        }, twitterDetailsCallback);
    }
    return strategy;
}
// creating google-passport strategy
passport_1.default.use(envStrategy());
