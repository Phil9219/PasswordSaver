console.log("wifi=123");

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

const args = process.argv.slice(2);
const passwordName = args[0];
console.log;

if (passwordName === "phil") {
  console.log("Your PW is ppilihp");
} else {
  console.log("access denied");
}

const inquirer = require("inquirer");

var questions = [
  {
    type: "input",
    name: "name",
    message: "What's your name?",
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(`Hi ${answers["name"]}!`);
});
