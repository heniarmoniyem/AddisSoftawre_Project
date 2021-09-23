import './App.css';
import React, { useState,useEffect } from 'react';
import Axios from 'axios' 


function App() {

  const [employeeName, setEmployeeName] = useState('');
  const [dateOfBirth, setDateOfBirth]= useState('');
  const [gender, setGender]= useState('');
  const [salary, setSalary]=useState(0);



  const [newEmployeeName, setNewEmployeeName]= useState('');

  const [employeeList, setEmployeeList] = useState([]);

  useEffect(()=> {
    Axios.get("http://localhost:3001/read").then((response)=>{
      setEmployeeList(response.data);
    });
  }, []);

  

  const addToList = ()=>{
    Axios.post("http://localhost:3001/insert", {employeeName: employeeName, dateOfBirth: dateOfBirth, gender: gender, salary: salary})
  };

const updateName = (id) => {
  Axios.put("http://localhost:3001/update", {
    id: id, 
    newEmployeeName: newEmployeeName});
}

const deleteEmployee = (id) => {
  Axios.delete(`http://localhost:3001/delete/${id}`);
};

  return (
    <div className="App">
      <table>
        <thead>
        <h1>Employee Data</h1>
          <tr>
            <th>
            <label>Employee Name:</label>
            </th>
            <th>
            <label>Date of Birth:</label>
            </th>
            <th>
            <label>Gender:</label>
            </th>
            <th>
            <label>Salary:</label>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            <input 
        type= "text"  
        onChange={(event) => {
          setEmployeeName(event.target.value);
        }}
          />
            </td>
            <td>
            <input 
        type= "text" 
        onChange={(event) =>{
          setDateOfBirth(event.target.value);
        }}/>
            </td>
            <td>
            <input 
        type= "text" 
        onChange={(event) =>{
          setGender(event.target.value);
        }}/>
            </td>
            <td>
            <input type= "number" onChange={(event) =>{
          setSalary(event.target.value);
        }} />
            </td>
            <td>
            <button  onClick={addToList}>Add To List</button>
            </td>
          </tr>
        </tbody>
      </table>
     
    
        
    <h1>List of Employees</h1>

    {employeeList.map((val, key) => {
      return <div key={key}> 
      <table>
          <thead>
            <tr>
              <th>
                Employee Name
              </th>
              <th>
                Date Of Birth
              </th>
              <th>
                Gender
              </th>
              <th>
                Salary
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>
              {val.employeeName}
              </td>
              <td>
              {val.dateOfBirth}
              </td>
              <td>
              {val.gender}
              </td>
              <td>
              {val.salary}
              </td>
              <td>
              <input type="text" placeholder="Update Employee Name" 
                    onChange={(event) =>{
                    setNewEmployeeName(event.target.value); 
              }}/>
              </td>
              <td>
              <button onClick= {()=>updateName(val._id)}>Update</button>
              </td>
              <td>
              <button onClick= {()=>deleteEmployee(val._id)}>Delete</button>
              </td>
            </tr>
          </tbody>
                    
                    
                    
       </table>
      </div>
    })}


    </div>
  );
}

export default App;
