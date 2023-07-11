INSERT INTO departments(roles)
VALUES ("sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO roles(title, salary, department_id)
Values ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2), ("Sales Lead", 100000, 1), ("salesperson", 50000, 1);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("cole", "dan", 1, null), ("kenz", "robert", 2, 1), ("robbie", "johnny", 3, null), ("sarah", "kennedy", 4, 2), ("kent", "kirk", 2, 1), ("kyle", "arty", 6, 3);


SELECT * FROM employees;
SELECT * FROM managers;