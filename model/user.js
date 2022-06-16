const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: Schema.Types.String, required: true},
    surname: { type: Schema.Types.String, required: true },
    username: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    password: {type: Schema.Types.String, required: true },
    gender: { type: Schema.Types.String },
    birthDate: { type: Schema.Types.Date },
    verified: { type: Schema.Types.Boolean },
    slug: { type: Schema.Types.String },
    phone: { type: Schema.Types.Number },
    userToken: [{ type: Schema.Types.ObjectId, ref: 'UserToken' }],
    facebookId: { type: Schema.Types.String },
    instagramId: { type: Schema.Types.String },
    instagramUsername: { type: Schema.Types.String },
    instagramToken: { type: Schema.Types.String },
    instagramProfilePicture: { type: Schema.Types.String }
});

module.exports = mongoose.model('user', UserSchema);