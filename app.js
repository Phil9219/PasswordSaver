const chalk = require("chalk");

console.log("wifi=123");

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

const args = process.argv.slice(2);
const passwordName = args[0];
console.log;

const inquirer = require("inquirer");

const superSavePassword = "Igel";

// const passWordSafe = {
//   wifi: "123456789",
//   gmail: "987654321",
//   yahoo: "1020304050",
// };

const questions = [
  {
    type: "password",
    name: "masterPassword",
    message: "Whats your password?",
  },
  {
    type: "input",
    name: "passWords",
    message: "What password did you forget?",
  },
];

async function validateAccess() {
  const { passWords, masterPassword } = await inquirer.prompt(questions);

  if (masterPassword !== superSavePassword) {
    console.error(chalk.red("Get Out! You are wrong!"));
    validateAccess();
    return;
  }

  const fs = require("fs");

  const passWordSafe = JSON.parse(
    fs.readFileSync("/Users/philipp/dev/PasswordSaver/db.json", "utf8")
  );

  const passWordKey = Object.keys(passWordSafe);

  if (passWordKey.includes(passWords)) {
    console.error(chalk.green(passWordSafe[passWords]));
  } else {
    console.log(chalk.red("Does not exist"));
  }
}

validateAccess();
