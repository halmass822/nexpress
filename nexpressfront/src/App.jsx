import { useState } from 'react';
import axios from 'axios';
import './App.css'
import HRForm from '../HRForm/HRForm';

function App() {
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [data, setData] = useState({
    name: "",
    id: "",
    hireDate: "",
    position: ""
  });
  const [functionState, setFunctionState] = useState("awaiting request");

  function handleError(error) {
    setData({name: "", id: "", hireDate: "", position: ""});
    if(error.response) {
      setFunctionState(`Error code ${error.response.status}`);
    } else {
      console.error(error);
      setFunctionState("Error logged to console");
    }
  }

  async function getEmployee(e) {
    setFunctionState("Sending request...");
    setTimeout( async () => {
        e.preventDefault();
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
        handleError(error);
      }
    }, (Math.ceil(1000 + Math.random() * 500))
  )}

  async function createEmployee(info) {
    setFunctionState("Sending request...");
    console.log(`POST request sent to http://localhost:3000/employees\nRequest Data:`);
    console.table(info);
    setTimeout(async () => {
      try {
        await axios.post(`http://localhost:3000/employees`, null,
        {
          params: info,
          headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
          if(response){
            setData(response.data);
            setFunctionState("New Employee Record Created!");
          } else {
            setData({name: "", id: "", hireDate: "", position: ""});
            setFunctionState("Request failed!");
          }
        })
      } catch (error) {
        handleError(error);
      }
    }, Math.ceil(1000 + Math.random() * 500))
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
      <HRForm createEmployee={createEmployee} />
    </>
  )
}

export default App