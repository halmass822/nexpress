const express = require('express');
const cors = require("cors");

const PORT = "3000";

let idCounter = 668;
const employees = [
    {
        name: "John Doe",
        id: "543",
        hireDate: "June 32nd",
        position: "bottle opener"
    },
    {
        name: "Jane Doherty",
        id: "332",
        hireDate: "May 55th",
        position: "bottle closer"
    },
    {
        name: "Jeremiah Dongle",
        id: "667",
        hireDate: "January 17th",
        position: "bottle shaker"
    },
    {
        name: "Jimmy Derringer",
        id: "121",
        hireDate: "October 11th",
        position: "bottle counter"
    },
]

const app = express();

app.use(cors());

app.use((req, res, next) => {
    console.log(`request recieved:` , req.url);
    next();
})

app.get("/employees/:id", (req, res) => {
    const targetEmployee = employees.find((x) => x.id == req.params.id);
    console.dir(employees)
    if(targetEmployee){
        res.send(targetEmployee);
    } else {
        res.sendStatus(404);
    }
});

app.post("/employees", ({query}, res) => {
    if(query.name && query.hireDate && query.position) {
        const newEmployee = {
            name: query.name,
            id: idCounter,
            hireDate: query.hireDate,
            position: query.position
        };
        employees.push(newEmployee);
        idCounter += Math.ceil(Math.random() * 11);
        res.send(newEmployee);
    } else {
        res.sendStatus(400);
    }
});

app.put("/employees/:id", (req, res) => {
    const targetEmployeeIndex = employees.findIndex(x => x.id == req.params.id);
    if(targetEmployeeIndex > 0 && req.query.name && req.query.hireDate && req.query.position) {
        Object.assign(employees[targetEmployeeIndex], req.query);
        res.send(employees[targetEmployeeIndex]);
    } else {
        res.sendStatus(404);
    }
});

app.delete("/employees/:id", (req, res) => {
    const targetEmployeeIndex = employees.findIndex(x => x.id == req.params.id);
    if(targetEmployeeIndex > 0){
        employees.splice(targetEmployeeIndex, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})