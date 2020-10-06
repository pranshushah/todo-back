"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: {
            validator: function (email) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            },
            message: function (message) {
                return message.value + " is not valid email";
            },
        },
    },
    name: {
        type: String,
        required: [true, 'name is required '],
    },
    imageURL: {
        type: String,
        required: [true, 'imageurl  is required '],
    },
    googleId: {
        type: String,
    },
    twitterId: {
        type: String,
    },
}, {
    // to convert returning object as we want
    toJSON: {
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
        },
    },
});
// googleId XOR twitterId should be 1;
userSchema.pre('validate', function (next) {
    if (this.get('googleId') || this.get('twitterId')) {
        next();
    }
    else {
        next(new Error('you should provide either googleid or twitterid'));
    }
});
// this created because we can type check with new User({});
userSchema.statics.build = function (user) {
    return new User(user);
};
var User = mongoose_1.model('User', userSchema);
exports.User = User;
