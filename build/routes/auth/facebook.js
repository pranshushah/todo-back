"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
exports.facebookLogin = router;
// getting code for data
router.get('/api/auth/facebook', passport_1.default.authenticate('facebook', { scope: ['profile', 'email'] }));
// passing code to google and then it will call callback function passed in new facebookStrategy
router.get('/api/auth/facebook/callback', passport_1.default.authenticate('facebook'));
router.get('/api/current_user', function (req, res) {
    console.log(req.user);
    res.send(req.user);
});
router.get('/api/logout', function (req, res) {
    req.logout();
    res.send('done');
});
