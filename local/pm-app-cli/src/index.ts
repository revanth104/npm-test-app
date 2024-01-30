import inquirer from "inquirer";
import shell from "shelljs";

const deployToVerdaccio = async () => {
  shell.exec("pnpm set registry http://localhost:4873/");
  shell.exec("pnpm publish --registry http://localhost:4873 --no-git-checks");
};

const unpublishFromVerdaccio = async () => {
  shell.exec(
    "pnpm unpublish --force @krish/hubspot --registry:http://localhost:4873"
  );
  shell.exec("pnpm set registry https://registry.npmjs.org/");
};

const main = async () => {
  console.log("Welcome to pm apps CLI!");

  const QUESTIONS = [
    {
        type: "list",
        name: "action",
        message: "Choose an action",
        choices: ["Deploy to Verdaccio", "Unpublish from Verdaccio"],
    }
  ]

  const {action} = await inquirer.prompt(QUESTIONS);
  if (action === "Deploy to Verdaccio") {
    await deployToVerdaccio();
  } else if (action === "Unpublish from Verdaccio") {
      await unpublishFromVerdaccio()
  } else {
    console.log("Invalid action please choose a valid action");
  }
};

main()
