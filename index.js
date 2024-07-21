const inquirer = require('inquirer');
const { Pool } = require('pg');

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
              'Add Employee', 
              'Remove Employee', 
              'Update Employee Role', 
              'Update Employee Manager', 
              'Quit'
            ],
        },
    ])
    .then((responses) => {
        const choice = responses.nav;
        if (choice === 'View All Employees') {
            pool.query('SELECT * FROM employee', function (err, result) {
              if (err) {
                console.error(err);
              } else {
                console.table(result.rows);
              }
              promptUser();
            });
           
        } else if(choice === 'View All Employees By Department') {
          pool.query(`
            SELECT employee.*, department.name AS department_name
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
          `, function (err, result) {
            if (err) {
              console.error(err);
            } else {
              console.table(result.rows);
            }
            promptUser();
          });
        } else if (choice === 'View All Employees By Manager') {
          pool.query(`
            SELECT employee.*, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
            FROM employee
            LEFT JOIN employee manager ON employee.manager_id = manager.id
          `, function (err, result) {
            if (err) {
              console.error(err);
            } else {
              console.table(result.rows);
            }
            promptUser();
          });
        } else if (choice === 'View All Employees By Salary') {
          pool.query(`
            SELECT employee.*, role.salary
            FROM employee
            JOIN role ON employee.role_id = role.id
            ORDER BY role.salary DESC
          `, function (err, result) {
            if (err) {
              console.error(err);
            } else {
              console.table(result.rows);
            }
            promptUser();
          });
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
        } else if (choice === 'Quit') {
          console.log('Goodbye!');
          pool.end(); 
          process.exit();
        } else {
          console.log(`Unhandled choice: ${choice}`);
          promptUser();
        }
      });
    };
    
    module.exports = {
      asciiMessage,
      promptUser
    };
    
    
    