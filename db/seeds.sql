INSERT INTO department (name)
VALUES  ('Sales'),
        ('Customer Service'),
        ('Janitorial');

INSERT INTO role (title, salary, department_id)
VALUES  ('Sales', '$40,000', 001),
        ('Customer Service', '$35,000', 002),
        ('Custodial Arts Manager', '$110,000', 003);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  ()