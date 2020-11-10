console.log("wifi=123");

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

const args = process.argv.slice(2);
const passwordName = args[0];
console.log;

const inquirer = require("inquirer");

const superSavePassword = "Igel";

const questions = [
  {
    type: "input",
    name: "name",
    message: "What's your name?",
  },
  {
    type: "password",
    name: "masterPassword",
    message: "Whats your password?",
  },
];

async function validateAccess() {
  const { masterPassword } = await inquirer.prompt(questions);

  if (masterPassword !== superSavePassword) {
    console.error("Get Out! You are wrong!");
    validateAccess();
    return;
  } else {
    console.log("Your Are In");
  }
}

validateAccess();
