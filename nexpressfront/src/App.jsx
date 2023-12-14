import { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [data, setData] = useState({
    name: "",
    id: "",
    hireDate: "",
    position: ""
  });
  const [dialogState, setDialogState] = useState(false);
  const [functionState, setFunctionState] = useState("awaiting request");
  // const [loading, setLoadingStatus] = useState(false);
  // const [errorStatus, setErrorStatus] = useState(false);

  // const [name, setName] = useState(""); MOVE TO CREATE EMPLOYEE FORM
  // const [id, setId] = useState("");
  // const [hireDate, setHireDate] = useState("");
  // const [position, setPosition] = useState("");


  async function getEmployee(e) {
    e.preventDefault();
    setFunctionState("Sending request...");
    console.log(`GET request to http://localhost:3000/employees/${employeeSearch}`);
    try {
      await axios.get(`http://localhost:3000/employees/${employeeSearch}`).then((response) => {
        if(response){
          setData(response.data);
          setFunctionState("Request successful!");
        } else {
          setData({name: "", id: "", hireDate: "", position: ""});
          setFunctionState("Request failed!");
        }
      });
    } catch (error) {
      setData({name: "", id: "", hireDate: "", position: ""});
      console.error(error);
      setFunctionState("Error logged to console");
    }
  }

  async function createEmployee(info) {
    setFunctionState("Sending request...");
    console.log(`PUT request sent to http://localhost:3000/employees/${info.id}\nRequest Data:`);
    console.table(info);
    try {
      await axios.post(`http://localhost:3000/employees/${info.id}`, info).then(response => {
        if(response){
          setData(response.data);
          setFunctionState("Request successful!");
        } else {
          setData({name: "", id: "", hireDate: "", position: ""});
          setFunctionState("Request failed!");
        }
      })
    } catch (error) {
      setData({name: "", id: "", hireDate: "", position: ""});
      console.error(error);
      setFunctionState("Error logged to console");
    }
  }

  return (
    <>
      <div className="SearchBar">
        <label>
          <h2>Search:</h2>
          <input type="text" value={employeeSearch} placeholder="Employee ID" onChange={(e) => setEmployeeSearch(e.target.value)}></input>
          <button onClick={(e) => getEmployee(e)}>Search</button>
          <h2>App state: {functionState}</h2>
        </label>
      </div>
      <div className="employeeData">
        {data.name &&
          <div className="results">
            <h2>Name: {data.name}</h2> 
            <h2>Id: {data.id}</h2> 
            <h2>Hire Date: {data.hireDate}</h2> 
            <h2>Position: {data.position}</h2>
          </div> 
        }
      </div>
    </>
  )
}

export default App