const mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://zeyakarim:Madiha23@cluster0.okbhzyb.mongodb.net/MERNProject?retryWrites=true&w=majority",
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true     
    }
);

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open',function(){
    console.log('successfully connected to the database');
});

module.exports = db;


