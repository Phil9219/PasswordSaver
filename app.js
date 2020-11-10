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
  type: "input",
  name: "Y",
  message: "Do you want to change the password? [Y/N]",
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

  const { Y } = await inquirer.prompt(questionChangePW);

  if (Y === "Y") {
    console.log(chalk.green("I will change it for you"));
  } else {
    console.log(chalk.red("Go on"));
  }

  const { passWords } = await inquirer.prompt(questionPassword);

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

async function changePassword(passWordSafe) {
  const content = "Some content!";

  try {
    const data = fs.writeFileSync(
      "/Users/philipp/dev/PasswordSaver/db.json",
      content
    );
    //file written successfully
  } catch (err) {
    console.error(err);
  }

  fs.writeFile(
    "/Users/philipp/dev/PasswordSaver/db.json",
    content,
    { flag: "a+" },
    (err) => {}
  );
}
