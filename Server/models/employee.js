const mongoose= require('mongoose')


const EmployeeSchema = new mongoose.Schema({
    employeeName:{
        type: String,
        required: true,

    },
    dateOfBirth:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    salary:{
         type: Number,
        required: true,
    },
});

const Employee = mongoose.model("Employee", EmployeeSchema)
module.exports = Employee