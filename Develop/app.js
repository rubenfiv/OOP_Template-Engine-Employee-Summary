const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const writeFileAsync = util.promisify(fs.writeFile);

const employeeDB = []
let id = employeeDB.length + 1

const menuQuestions = [
  {
    type: "list",
    name: "employeeType",
    message: "What do you want to do?",
    choices: ["Add Manager", "Add Engineer", "Add Intern", "Quit"]
  }
]

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const initialQuestions = [
    {
      type: "input",
      name: "name",
      message: "What is the manager's name?"
    },
    {
      type: "input",
      message: "What is the manger's email?",
      name: "email", 
    },
    {
      type: "input",
      message: "What is the manger's office number?",
      name: "officeNumber", 
    }
  ];

  const engineerQuestions = [
  {    
    type: "input",
    name: "name",
    message: "What is the engineer's name?"
  },
  
  {
    type: "input",
    message: "What is the engineer's email?",
    name: "email", 
  },
  {
    type: "input",
    message: "What is the Github username?",
    name: "github", 
  }
  ]
  const internQuestions = [
    {    
      type: "input",
      name: "name",
      message: "What is the intern's name?"
    },
    
    {
      type: "input",
      message: "What is the intern's email?",
      name: "email", 
    },
    {
      type: "input",
      message: "What is the intern's school?",
      name: "school", 
    }
  
  ]


function runQuestions(){
  inquirer.prompt(menuQuestions).then(userInput => {
    switch(userInput.employeeType){
      case "Add Manager":
        addManager()
        break
      case "Add Engineer":
        addEngineer()
        break
      case "Add Intern":
        addIntern()
        break
      case "Quit":
        quit()
        break
    }
  })
}

function addManager(){
  inquirer.prompt(initialQuestions).then(userInput =>{
    const manager = new Manager(userInput.name, id++, userInput.email, userInput.officeNumber )
    employeeDB.push(manager)
    runQuestions()
  })
}
function addEngineer(){
  inquirer.prompt(engineerQuestions).then(userInput =>{
    const engineer = new Engineer(userInput.name, id++, userInput.email, userInput.github)
    employeeDB.push(engineer)
    runQuestions()
  })
}
function addIntern(){
  inquirer.prompt(internQuestions).then(userInput =>{
    const intern = new Intern(userInput.name, id++, userInput.email, userInput.school)
    employeeDB.push(intern)
    runQuestions()
  })
}
function quit(){
  const team = render(employeeDB)
  fs.writeFile(outputPath, team, function(err) {
    if(err) throw err
    console.log(err)
  })  
}
runQuestions()
  // After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
