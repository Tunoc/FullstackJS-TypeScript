import mongoose, { mongo } from 'mongoose';
import _ from 'lodash';
const CONNECTOR = 'mongodb+srv://FullstackUser:Over1Complicated2Psw3@fullstack-js.1z9jq.mongodb.net/graphql?retryWrites=true&w=majority';

// Mongo connection
mongoose.Promise = global.Promise;
mongoose.connect(CONNECTOR, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const friendSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },
    language: {
        type: String
    },
    email: {
        type: String
    },
    contacts: {
        type: Array
    }
});

const Friends = mongoose.model('friends', friendSchema);

export { Friends };
