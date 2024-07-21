const inquirer = require('inquirer');
const { Pool } = require('pg');

// connect to the employees_db using my log in info
const pool = new Pool(
    {
      user: 'postgres',
      password: 'Lmsk09771!!',
      host: 'localhost',
      database: 'employees_db'
    },
    console.log(`Connected to employees_db.`)
  )
  pool.connect();
// Function to make the cool ascii message when the application first begins
const asciiMessage = `
,--------------------------------------------------------.
|  _____                 _                               |
| | ____|_ __ ___  _ __ | | ___  _   _  ___  ___         | 
| |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\        | 
| | |___| | | | | | |_) | | (_) | |_| |  __/  __/        | 
| |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|        | 
| |  \\/  | __ _ _ |_|  __ _  __ _|___/ _ __              | 
| | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |/ _ \\ '__|             |   
| | |  | | (_| | | | | (_| | (_| |  __/ |                | 
| |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|                | 
|                           |___/                        | 
|                                                        | 
'--------------------------------------------------------'                                                     
`;              
console.log(asciiMessage);
// Prompts giving all of the options to choose from
const promptUser = () => {
inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'nav',
            choices: ['View All Employees', 
              'View All Employees By Department', 
              'View All Employees By Manager',
              'View All Employees By Salary',
              'View All Departments',
              'View All Roles',
              'Add Department',
              'Add Role', 
              'Add Employee', 
              'Remove Employee', 
              'Update Employee Role', 
              'Update Employee Manager', 
              'Quit'
            ],
        },
    ])
    .then((responses) => {
      // Selects all of the employees from the DB and displays them in a table format
        const choice = responses.nav;
        if (choice === 'View All Employees') {
            pool.query(`SELECT * FROM employee`, function (err, result) {
              if (err) {
                console.error(err);
              } else {
                console.table(result.rows);
              }
              promptUser();
            });
           // Selects all of the employees by department from the DB and displays them in a table format
        } else if(choice === 'View All Employees By Department') {
          pool.query(`
            SELECT employee.*, department.name AS department_name
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id`, function (err, result) {
            if (err) {
              console.error(err);
            } else {
              console.table(result.rows);
            }
            promptUser();
          });
          // Selects all of the employees by manager from the DB and displays them in a table format
        } else if (choice === 'View All Employees By Manager') {
          pool.query(`
            SELECT employee.*, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
            FROM employee
            LEFT JOIN employee manager ON employee.manager_id = manager.id`, function (err, result) {
            if (err) {
              console.error(err);
            } else {
              console.table(result.rows);
            }
            promptUser();
          });
          // Selects all of the employees along with their salaries from the DB and displays them in a table format
        } else if (choice === 'View All Employees By Salary') {
          pool.query(`
            SELECT employee.*, role.salary
            FROM employee
            JOIN role ON employee.role_id = role.id
            ORDER BY role.salary DESC`, function (err, result) {
            if (err) {
              console.error(err);
            } else {
              console.table(result.rows);
            }
            promptUser();
          });
          // Selects all of the departments from the DB and displays them in a table format
        } else if (choice === 'View All Departments') {
          pool.query('SELECT * FROM department', function (err, result) {
            if (err) {
              console.error(err);
            } else {
              console.table(result.rows);
            }
            promptUser();
          });
          // Selects all of the roles from the DB and displays them in a table format
        } else if (choice === 'View All Roles') {
          pool.query('SELECT * FROM role', function (err, result) {
            if (err) {
              console.error(err);
            } else {
              console.table(result.rows);
            }
            promptUser();
          });
          // Lets you add a new department to the DB
        } else if (choice === 'Add Department') {
          inquirer.prompt([
            {
              name: 'department_name',
              type: 'input',
              message: 'Enter the name of the new department:'
            }
          ])
          .then((answers) => {
            pool.query(`
              INSERT INTO department (name)
              VALUES ($1)
            `, [answers.department_name], function (err, result) {
              if (err) {
                console.error(err);
              } else {
                console.log('Department added successfully.');
              }
              promptUser();
            });
          });
          // Lets you add a new role to the DB
        } else if (choice === 'Add Role') {
          inquirer.prompt([
            {
              name: 'role_title',
              type: 'input',
              message: 'Enter the title of the new role:'
            },
            {
              name: 'role_salary',
              type: 'input',
              message: 'Enter the salary for the new role:'
            },
            {
              name: 'department_id',
              type: 'input',
              message: 'Enter the department ID for the new role:'
            }
          ])
          .then((answers) => {
            pool.query(`
              INSERT INTO role (title, salary, department_id)
              VALUES ($1, $2, $3)  
            `, [answers.role_title, answers.role_salary, answers.department_id], function (err, result) {
              if (err) {
                console.error(err);
              } else {
                console.log('Role added successfully.');
              }
              promptUser();
            });
          });    
          // // Lets you add a new employee to the DB
        } else if (choice === 'Add Employee') {
          inquirer.prompt([
            {
              name: 'first_name',
              type: 'input',
              message: "Enter the employee's first name:"
            },
            {
              name: 'last_name',
              type: 'input',
              message: "Enter the employee's last name:"
            },
            {
              name: 'role_id',
              type: 'input',
              message: "Enter the employee's role ID:"
            },
            {
              name: 'manager_id',
              type: 'input',
              message: "Enter the employee's manager ID (if applicable):"
            }
          ])
          .then((answers) => {
            pool.query(`
              INSERT INTO employee (first_name, last_name, role_id, manager_id)
              VALUES ($1, $2, $3, $4)
            `, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id || null], function (err, result) {
              if (err) {
                console.error(err);
              } else {
                console.log('Employee added successfully.');
              }
              promptUser();
            });
          });
          // Lets you remove an employee from the DB
        } else if (choice === 'Remove Employee') {
          inquirer.prompt([
            {
              name: 'employee_id',
              type: 'input',
              message: "Enter the ID of the employee you want to remove:"
            }
          ])
          .then((answers) => {
            pool.query('DELETE FROM employee WHERE id = $1', [answers.employee_id], function (err, result) {
              if (err) {
                console.error(err);
              } else {
                console.log('Employee removed successfully.');
              }
              promptUser();
            });
          });
          // Lets you update employee role info
        } else if (choice === 'Update Employee Role') {
          inquirer.prompt([
            {
              name: 'employee_id',
              type: 'input',
              message: "Enter the ID of the employee whose role you want to update:"
            },
            {
              name: 'role_id',
              type: 'input',
              message: "Enter the new role ID:"
            }
          ])
          .then((answers) => {
            pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answers.role_id, answers.employee_id], function (err, result) {
              if (err) {
                console.error(err);
              } else {
                console.log('Employee role updated successfully.');
              }
              promptUser();
            });
          });
          // Lets you update employee manager info
        } else if (choice === 'Update Employee Manager') {
          inquirer.prompt([
            {
              name: 'employee_id',
              type: 'input',
              message: "Enter the ID of the employee whose manager you want to update:"
            },
            {
              name: 'manager_id',
              type: 'input',
              message: "Enter the new manager ID:"
            }
          ])
          .then((answers) => {
            pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [answers.manager_id, answers.employee_id], function (err, result) {
              if (err) {
                console.error(err);
              } else {
                console.log('Employee manager updated successfully.');
              }
              promptUser();
            });
          });
          // Lets yuo exit the application
        } else if (choice === 'Quit') {
          console.log('Goodbye!');
          pool.end(); 
          process.exit();
        } else {
          console.log(`Selection Error: ${choice}`);
          promptUser();
        }
      });
    };
    
    module.exports = {
      asciiMessage,
      promptUser
    };
    
    
    