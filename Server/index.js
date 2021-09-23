const express= require("express");
const mongoose =require("mongoose");
const cors= require("cors");
const app=express();

const  EmployeeModel =require("./models/employee")

app.use(express.json())
app.use(cors());

mongoose.connect(
    "mongodb+srv://EmpCrud:password123456@cluster0.wa0jn.mongodb.net/empcrud?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true,
    }
       
);


app.post("/insert",async (req, res)=>{

    const employeeName =req.body.employeeName;
    const dob = req.body.dateOfBirth;
    const gender=req.body.gender;
    const salary=req.body.salary;


    const employee= new EmployeeModel({employeeName : employeeName, dateOfBirth: dob, gender: gender, salary: salary});

    try{
        await employee.save();
    }
    catch(err) {
        console.log(err);
    }

});


app.get("/read",async (req, res)=>{

 EmployeeModel.find({}, (err, result) => {
     if(err){
         res.send(err);
     }
     res.send(result);
 })

});

app.put("/update",async (req, res)=>{

    const newEmployeeName =req.body.newEmployeeName;
    const id = req.body.id;
   

    try{
       await EmployeeModel.findById(id, (err, updatedName) =>{
            updatedName.employeeName= newEmployeeName;
            updatedName.save();
            res.send("update");
        });
    }
    catch(err) {
        console.log(err);
    }

});

app.delete("/delete/:Id", async(req, res)=> {

    const id = req.params.id;
    
    await EmployeeModel.findByIdAndRemove(id).exec();
    res.send("Deleted");
});

app.listen(3001, ()=>{
console.log('Server Running On Port 3001...')
});
