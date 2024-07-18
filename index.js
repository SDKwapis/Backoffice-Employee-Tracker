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
            choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Quit']
        }
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
          } 
        // } else if(choice === 'View All Employees By Department') {

        // } else if(choice === 'View All Employees By Manager') {

        // } else if(choice === 'Add Employee') {

        // } else if(choice === 'Remove Employee') {

        // } else if(choice === 'Update Employee Role') {

        // } else if(choice === 'Update Employee Manager') {

        else if (choice === 'Quit') {
            console.log('Goodbye!');
            pool.end(); 
            process.exit()
          } 
          else {
            console.log(`Unhandled choice: ${choice}`);
            promptUser();
          }
        });
    };
    
    module.exports = {
        asciiMessage,
        promptUser
      };
      
