"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
exports.currentUser_logout = router;
router.get('/api/current_user', function (req, res) {
    res.status(200).send(req.user);
});
router.get('/api/logout', function (req, res) {
    req.logout();
    req.session = null;
    res.status(200).send('done');
});
