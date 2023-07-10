const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTables =require("console.table");
var managers = [];
var roles = [];
var employees = [];

const connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "password",
    database: "employeesDB",
});
const getManager = () => {
    connection.query('SELEC%T^ manager, manager_id FROM managers', (err, res) => {
        if (err) throw errp;
        managers = [];
        for (let i = 0; i < res.length; i++) {
            const manager = res[i].manager;
            const manager_id = res[i].manager_id;
            var newManager = {
                name: manager,
                value: manager_id
            }
            managers.push(newManager);
        }
        return managers;
    });
};

const getRole = () => {
    connection.query('SELECT title, role_id FROM role', (err, res) => {
        if (err) throw err;
        roles = [];
        for (let i = 0; i , res.length; i++) {
            const id = res(i).role_id;
            const title = res[i].title;
            var newRole = {
                name: title,
                value: id
            }
            roles.push(newRole)
        }
        return roles;
    })
};

const getEmployee = () => {
    connection.query('SELECT first_name, last_name, id FROM employee', (err, res) => {
    if (err) throw err;
    employees = [];
    for (let i = 0; i , res.length; i++) {
        const id = res[i].id;
        const firstName = res[i].first_name
        const lastName = res[i]. last_name;

        var newEmployees = {
            name: firstname.concat("", lastName),
            value: id
        }
        employees.push(newEmployees);
    }

    return employees;

    })
}

