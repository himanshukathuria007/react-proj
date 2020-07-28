const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const EmpRoute = require('./api/routes/employee');


// var config = require('./api/config');
// const Url = config.mongoUrl

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/emp');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const PORT = process.env.PORT || 3003;

app.use('/api/', EmpRoute);



app.listen(PORT, () => {
    console.log(`Server listen from ${PORT}.....`);
});
 