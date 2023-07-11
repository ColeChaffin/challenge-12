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

const roleCheck = 'SELECT is, employee.first_name, employee.last_name, title, salary, department.role, managers.manager FROM employee JOIN role ON employee.role_id = role.role_idJOIN department ON role.department-id = department.department_id LEFT JOIN managers on employee.manager_id = managers.manager_id';

const init = () => {
    getEmployee();
    getRole();
    getManager();
    inquirer
    .createPromptModule({
        name: "init",
        type: "rawlist",
        message: "what would you like to do?",
        choices: [
            "view all employees",
            "view all employees by department",
            "view all employees by manager",
            "add employees",
            "remove employee",
            "update employee role",
            "update employee manager",
            "view all roles",
            "view all managers",
        ],
    })
    .then((answer) => {
        switch (answer.init) {
            case "view all employees":
                allEmployees();
                break;

            case "view all employees by department":
                allEmployeeDepartments();
                break;

            case "view all employees by manager":
                allEmployeeManagers();
                break;

            case "add employee":
                addEmployee();
                break;

            case "remove employee":
                removeEmployee();
                break;

            case "update employee role":
                updateRole();
                break;

            case "update employee manager":
                updateManager();
                break;

            case "view all roles":
                allRoles();
                break;

            case "view all managers":
                allManagers();
                break
            case "exit":
                connection.end();
                break;
        }
    });
};

const allEmployeeManagers = () => {
    inquirer
    .prompt({
        type: 'list',
        name: 'manager',
        message: 'choose a manager',
        choices: managers
    }).then((answer) => {
        connection.query('SELECT first_name, last_name FROM employee Where manager_id = ${answer.manager};', (err,res) => {
            if (err) throw err;
            console.table(res);
            init()
        })
    })
};

const updateManager = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'employee',
        message: 'what employee is getting a new manager',
        choices: employees
    },
    {
        type: 'list',
        name: 'manager',
        message: 'who is your new manager',
        choices: managers
    },
]).then((answer) => {
    connection.query('update employee SET manager_id = ${answer.manager} WHERE id = ${answer.employee}', (err,res) => {
        if (err) throw err;
        init()
    })
})
};

const updateRole = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'whose role are we updating',
            choices: employees
        },
        {
            type: 'list',
            name: 'role',
            message: 'what is their new role?',
            choices: roles,
        },
    ]).then((answer) => {
        connection.query('UPDATE employee SET role_id = ${answer.role} WHERE id = ${answer.employee};', (err, res) => {
            if (err) throw err;
            init();
        })
    })
};

const allManagers = () => {
    connection.query('SELECT manager FROM managers', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

const allEmployees = () => {
    connection.query(roleCheck, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

const allRoles = () => {
    connection.query('SELECT title FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

const allEmployeeDepartments = () => {
    inquirer
    .prompt({
        type: 'rewlist',
        name: 'departments',
        message: 'choose a department',
        choices: ['Engineering', 'Finance', 'Legal']
    }).then((answer) => {
        if (answer.departments === 'Engineering'){
            connection.query('SELECT employee.first_name, employee.Last_name FROM employee JOIN role ON employees.role_id = role.role_id JOIN department ON role.department_id = department.department_id and department.role = "Engineering"', (err, res) => {
                if (err) throw err;
                console.table(res);
                init();
            })
        }
        else if (answer.departments === 'Finance'){
            connection.query('SELECT employee.first_name, employee.Last_name FROM employee JOIN role ON employees.role_id = role.role_id JOIN department ON role.department_id = department.department_id and department.role = "Finance"', (err, res) => {
                if (err) throw err;
                console.table(res);
                init();
            })
        }
        if (answer.departments === 'Legal'){
            connection.query('SELECT employee.first_name, employee.Last_name FROM employee JOIN role ON employees.role_id = role.role_id JOIN department ON role.department_id = department.department_id and department.role = "Legal"', (err, res) => {
                if (err) throw err;
                console.table(res);
                init();
            })
        }
    });
};

addEmployees = () => {
    managers.push('none');
    inquirer.prompt([
        {
            type: 'input',
            name: 'last_name',
            message: 'what is your first name'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'what is your last name'
        },
        {
            type: 'list',
            name: 'role',
            message: 'what is your position',
            choices: roles
        },
        {
            type: 'list',
            name: 'manager',
            message: 'who is your manager',
            choices: managers
        },
    ]).then((answer) => {
        if (answer.manager === 'none') {
        connection.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) Values (${answer.first_name}', '${answer.last_name}', '${answer.role}, null)', (err, res) => {
            if (err) throw err;
            init();
        });
    }
    else {
        connection.query('INSERT INTO employee(first_name, last_name, role_id, manager_id)
        values ('${answer.first_name}', '${answer.last_name)', ${answer.role})', (err,res) => {
            if (err) throw err;
            init();
        })
    }
})
}

const removeEmployee = ( => {
    inquirer
    .prompt({
        type: 'list',
        name: 'employee',
        message: 'who would you like to remove',
        choices: employees
    }).then((answer) => {
        connection.query('DELETE FREM employee WHERE id=${answer.employee}', (err, res) => {
            if (err) throw err;
            init();
        })
    })
})
init()