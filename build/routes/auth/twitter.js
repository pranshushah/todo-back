"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
exports.twitterLogin = router;
// getting code for data
router.get('/api/auth/twitter', passport_1.default.authenticate('twitter'), function (req, res) {
    if (process.env.NODE_ENV === 'test') {
        res.status(200).send(req.user); // for jest testing will not called in dev or prdo env
    }
});
// passing code to google and then it will call callback function passed in new twitterStrategy
router.get('/api/auth/twitter/callback', passport_1.default.authenticate('twitter', {
    failureRedirect: 'http://localhost:3000/',
    successRedirect: 'http://localhost:3000/',
}));
