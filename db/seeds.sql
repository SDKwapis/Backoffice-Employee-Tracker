-- Seed data to build out the database for presentation purposes

INSERT INTO department (name)
VALUES  ('Sales'),
        ('Customer Service'),
        ('Janitorial'),
        ('Management');

INSERT INTO role (title, salary, department_id)
VALUES  ('Manager', '40000', 4),
        ('Sales Rep', '20000', 1),
        ('Service Rep', '10000', 2),
        ('Janitor', '90000', 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ('Jonathan', 'Archer', 1),
        ('Geordi', 'La Forge', 3),
        ('Beverly', 'Cruisher', 3),
        ('Deanna', 'Troi', 3),
        ('Miles', 'OBrien', 1),
        ('JeanLuc', 'Picard', 4),
        ('William', 'Riker', 4),
        ('Tasha', 'Yar', 4);

UPDATE employee SET manager_id = 6 WHERE id IN (1,5,6);
UPDATE employee SET manager_id = 7 WHERE id IN (2,4,7);
UPDATE employee SET manager_id = 8 WHERE id = 3;
UPDATE employee SET manager_id = 6 where id = 8;