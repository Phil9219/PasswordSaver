const inquirer = require("inquirer");

async function askForMasterPassword() {
  const { questionMainPassword } = await inquirer.prompt([
    {
      type: "password",
      name: "masterPassword",
      message: "Whats your password?",
    },
  ]);
  return questionMainPassword;
}

async function whatPasswordIsForgotten() {
  const { questionPassword } = await inquirer.prompt([
    {
      type: "input",
      name: "passWords",
      message: "What password did you forget?",
    },
  ]);
  return questionPassword;
}

async function changePassword() {
  const { questionChangePW } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Do you want to change the password?",
      choices: ["Yes", "No"],
    },
  ]);
  return questionChangePW;
}

async function 

exports.askForMasterPassword = askForMasterPassword;
exports.whatPasswordIsForgotten = whatPasswordIsForgotten;
exports.changePassword = changePassword;
