/* eslint-disable react/prop-types */
import {useState} from "react";

export default function HRForm(props) {
    const [name, setName] = useState("");
    const [hireDate, setHireDate] = useState("");
    const [position, setPosition] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        console.log(name,hireDate,position);
        props.createEmployee({name: name, hireDate: hireDate, position: position})
    }

    return <form className="newEmployeeForm" onSubmit={handleSubmit}>
        <h2>Create new employee record</h2>
        <label>Name:
            <input type="text" value={name} onChange={e => setName(e.target.value)}></input>
        </label>
        <label>Hire Date:
            <input type="text" value={hireDate} onChange={e => setHireDate(e.target.value)}></input>
        </label>
        <label>Position:
            <input type="text" value={position} onChange={e => setPosition(e.target.value)}></input>
        </label>
        <button type="submit">Create</button>
    </form>
}