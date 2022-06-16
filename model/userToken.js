const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserTokenSchema = new Schema({
    token: { type: Schema.Types.String, required: true},
    user: [{ type: Schema.Types.ObjectId, ref: 'UserToken' }]
});

module.exports = mongoose.model('userToken', UserTokenSchema);