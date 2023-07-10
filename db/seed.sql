INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("cole", "dan", 1, null), ("kenz", "robert", 2, 1), ("robbie", "johnny", 3, null), ("sarah", "kennedy", 4, 2), ("kent", "kirk", 2, 1), ("kyle", "arty", 6, 3);

INSERT INTO managers(manager)
VALUES("cole dan"), ("robbie johnny");

SELECT * FROM employees;
SELECT * FROM managers;