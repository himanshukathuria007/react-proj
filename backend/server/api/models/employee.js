const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    firstname: {
        type: String,
        required: [true, 'first-Name cannot be blank.']
    },
    lastname: {
        type: String,
        required: [true, 'last-Name cannot be blank.']
    },
    email: {
        type: String,
        required: [true, 'email cannot be blank.'],
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    phone: {
        type: String,
        required: [true, 'Contact Number cannot be blank.']
    },
    currentaddress: {
        type: String,
        required: [true, 'Address cannot be blank.']
    },
    permanentaddress: {
        type: String,
        required: [true, 'Parmanent-Address cannot be blank.']
    },
    img: {
        type: String
    },
    course: {
        type: String,
        required: [true, 'course cannot be blank.']
    },
    collage: {
        type: String,
        required: [true, 'collage/University cannot be blank.']
    },
    year: {
        type: Number,
        required: [true, 'year cannot be blank.']
    },
    percentage: {
        type: String,
        required: [true, 'percentage cannot be blank.']
    },
    companyname: {
        type: String,
        required: [true, 'Company-Name cannot be blank.']
    },
    fromdate:{
        type: Date,
       // required: [true, 'Duration cannot be blank.']
    },
    todate:{
        type: Date,
       // required: [true, 'Duration cannot be blank.']
    },

    
    designation: {
        type: String,
        required: [true, 'Designation cannot be blank.']
    },

    linkedin:{
        type: String,
        required: [true, 'linkedin cannot be blank.']
    },
    github:{
        type: String,
        required: [true, 'Github profile cannot be blank.']
    },
    facebook:{
        type: String,
        required: [true, 'Facebook cannot be blank.']
    },
    hobbies:{
        type:Array
    }




});

const Employee = mongoose.model('User', employeeSchema);

module.exports = Employee;