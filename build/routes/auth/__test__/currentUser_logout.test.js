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
var supertest_1 = __importDefault(require("supertest"));
var app_1 = require("../../../app");
var googleMockProfile_1 = require("../../../config/mocks/googleMockProfile");
var googleAuth_1 = require("../../../test/googleAuth");
var twitterMockProfile_1 = require("../../../config/mocks/twitterMockProfile");
var twitterAuth_1 = require("../../../test/twitterAuth");
it('returns current_user  with google-oauth', function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookie, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, googleAuth_1.googleAuthentication()];
            case 1:
                cookie = _a.sent();
                return [4 /*yield*/, supertest_1.default(app_1.app)
                        .get('/api/current_user')
                        .set('Cookie', cookie)
                        .expect(200)];
            case 2:
                res = _a.sent();
                expect(res.body.googleId).toEqual(googleMockProfile_1.googleMockProfile.id);
                expect(res.body.name).toEqual(googleMockProfile_1.googleMockProfile.displayName);
                expect(res.body.email).toEqual(googleMockProfile_1.googleMockProfile._json.email);
                return [2 /*return*/];
        }
    });
}); });
it('returns current_user  with twitter-oauth', function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookie, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, twitterAuth_1.twitterAuthentication()];
            case 1:
                cookie = _a.sent();
                return [4 /*yield*/, supertest_1.default(app_1.app)
                        .get('/api/current_user')
                        .set('Cookie', cookie)
                        .expect(200)];
            case 2:
                res = _a.sent();
                expect(res.body.twitterId).toEqual(twitterMockProfile_1.twitterMockProfile._json.id_str);
                expect(res.body.name).toEqual(twitterMockProfile_1.twitterMockProfile._json.screen_name);
                expect(res.body.email).toEqual(twitterMockProfile_1.twitterMockProfile._json.email);
                return [2 /*return*/];
        }
    });
}); });
it('logout twitter-oauth', function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookie, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, twitterAuth_1.twitterAuthentication()];
            case 1:
                cookie = _a.sent();
                return [4 /*yield*/, supertest_1.default(app_1.app)
                        .get('/api/logout')
                        .set('Cookie', cookie)
                        .expect(200)];
            case 2:
                res = _a.sent();
                expect(res.get('Set-Cookie')[0]).toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
                return [2 /*return*/];
        }
    });
}); });
it('logout google-oauth', function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookie, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, googleAuth_1.googleAuthentication()];
            case 1:
                cookie = _a.sent();
                return [4 /*yield*/, supertest_1.default(app_1.app)
                        .get('/api/logout')
                        .set('Cookie', cookie)
                        .expect(200)];
            case 2:
                res = _a.sent();
                expect(res.get('Set-Cookie')[0]).toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
                return [2 /*return*/];
        }
    });
}); });
