const mongoose = require('mongoose');

const URI = 'mongodb://127.0.0.1/mern-task';

mongoose.connect(URI)
    .then(db => console.log('BD conectado'))
    .catch(err => console.log(err));

    module.exports = mongoose;