"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = require("passport");
var MockStrategy = /** @class */ (function (_super) {
    __extends(MockStrategy, _super);
    function MockStrategy(options, callback) {
        var _this = _super.call(this) || this;
        _this._user = options.user;
        _this.name = options.name;
        _this.cb = callback;
        return _this;
    }
    MockStrategy.prototype.authenticate = function () {
        var _this = this;
        try {
            this.cb('accessToken', 'refreshToken', this._user, function (err, user, info) {
                if (err) {
                    return _this.error(err);
                }
                if (!user) {
                    return _this.fail(info);
                }
                _this.success(user, info);
            });
        }
        catch (e) {
            this.error(e);
        }
    };
    return MockStrategy;
}(passport_1.Strategy));
exports.default = MockStrategy;
