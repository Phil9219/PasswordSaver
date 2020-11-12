const chalk = require("chalk");

console.log("wifi=123");

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

const args = process.argv.slice(2);
const passwordName = args[0];
const newPasswordValue = args[1];
console.log;

const inquirer = require("inquirer");

const superSavePassword = "Igel";

const questionMainPassword = {
  type: "password",
  name: "masterPassword",
  message: "Whats your password?",
};

const questionPassword = {
  type: "input",
  name: "passWords",
  message: "What password did you forget?",
};

const questionChangePW = {
  type: "list",
  name: "choice",
  message: "Do you want to change the password?",
  choices: ["Yes", "No"],
};

async function validateAccess() {
  const { masterPassword } = await inquirer.prompt(questionMainPassword);

  if (masterPassword !== superSavePassword) {
    console.error(chalk.red("Get Out! You are wrong!"));

    validateAccess();
    return;
  } else {
    console.log(chalk.green("👍"));
  }

  const { choice } = await inquirer.prompt(questionChangePW);
  const fs = require("fs");
  const passWordSafe = JSON.parse(
    fs.readFileSync("/Users/philipp/dev/PasswordSaver/db.json", "utf8")
  );

  if (choice === "Yes") {
    changePassword(passWordSafe);
  } else {
    console.log(chalk.red("Go on"));
  }

  const { passWords } = await inquirer.prompt(questionPassword);

  const passWordKey = Object.keys(passWordSafe);

  if (passWordKey.includes(passWords)) {
    console.error(chalk.green(passWordSafe[passWords]));
  } else {
    console.log(chalk.red("Does not exist"));
  }
}

validateAccess();

async function changePassword(passWordSafe) {
  // Gib Liste von den bestehenden PWs.
  const choice = [];
  for (let key in passWordSafe) {
    choice.push(key);
  }

  const whichPwToChange = {
    type: "list",
    name: "choiceBenutzer",
    message: "Which Password do you want to change?\n",
    choices: choice,
  };
  // Gib choices an Benutzer aus mit list. (ergebnis = choiceBenutzer)
  const { choiceBenutzer } = await inquirer.prompt(whichPwToChange);

  // Frag den Bunutzer nach dem PW (benutzer = newPassword)

  const askForNewPassword = {
    type: "string",
    name: "newPassword",
    message: "What is the new Password?\n",
  };
  const { newPassword } = await inquirer.prompt(askForNewPassword);
  // Safe nehmen und Wert ändern.
  passWordSafe[choiceBenutzer] = newPassword;
  fs.writeFileSync("./db.json", JSON.parse(passWordSafe));
}

// async function changePassword(passWordSafe) {
//   const content = "Some content!";

//   try {
//     const data = fs.writeFileSync(
//       "/Users/philipp/dev/PasswordSaver/db.json",
//       content
//     );
//     //file written successfully
//   } catch (err) {
//     console.error(err);
//   }

//   fs.writeFile(
//     "/Users/philipp/dev/PasswordSaver/db.json",
//     content,
//     { flag: "a+" },
//     (err) => {}
//   );
// }
