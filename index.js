const inquirer = require('inquirer');

module.exports = () => {
let asciiMessage = `
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
        
    });
};

