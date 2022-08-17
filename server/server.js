const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const db = require('./config/mongoose'); 

app.use('/uploads', express.static('uploads'));

app.use('/',require('./routes/index'));


app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err);
        return;
    }
    console.log(`Server is running on port: ${port}`);
});