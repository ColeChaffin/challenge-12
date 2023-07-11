CREATE DATABASE employeesDB

USE employeesDB

CREATE TABLE departments (
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);



CREATE TABLE roles (
    id INT AUTO_INCREMENT,
    title VARCHAR(30)
    salary DECIMAL(10,2),
    department_id INT,
    FOREIGN KEY (department_id)
  REFERENCES departments(id)
    PRIMARY KEY(id)
);



CREATE TABLE employees (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE set null
    manager_id INT,
    FOREIGN KEY (manager_id)
  REFERENCES employees(id)
  ON DELETE set null
    PRIMARY KEY (id)
);
