// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// Create a function to initialize app
function initializeApp() {
// Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'projectTitle',
        message: 'Enter the title of your project:',
    },
    {
    type: 'checkbox',
    name: 'tableOfContents',
    message: 'Select the sections to include in the table of contents:',
    choices: [
      {
        name: 'Description',
      },
      {
        name: 'Installation',
      },
      {
        name: 'Usage',
      },
      {
        name: 'License',
      },
      {
        name: 'Contributing',
      },
      {
        name: 'Tests',
      },
      {
        name: 'Questions',
      },
    ]},
    {
        type: 'input',
        name: 'description',
        message: 'Enter a description of your project:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter installation instructions:',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter usage information:',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your application:',
        choices: ['MIT', 'Apache 2.0', 'GNU GPLv3', 'ISC', 'none'],
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Enter contribution guidelines:',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Enter test instructions:',
    },
    {
        type: 'input',
        name: 'githubUsername',
        message: 'Enter your GitHub username:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
    },
];

//fuction to create table of contents
function generateTableOfContents(answers) {
    let tableOfContents = '';
  
    if (answers.tableOfContents.length > 0) {
      tableOfContents += '## Table of Contents\n';
  
      answers.tableOfContents.forEach((section) => {
        tableOfContents += `* [${section}](#${section.toLowerCase()})\n`;
      });
    }
  
    return tableOfContents;
  }
//Use the answers object to perform further actions
inquirer.prompt(questions).then((answers) => {
    console.log(answers);
    
});

//Create a function to write README file
function writeREADME(answers) {
    const tableOfContents = generateTableOfContents(answers);
    const readmeContent = `
  # ${answers.projectTitle}

  ##Table of Contents
  ${tableOfContents}
  
  ## Description
  ${answers.description}
  
  ## Installation
  ${answers.installation}
  
  ## Usage
  ${answers.usage}
  
  ## License
  This application is covered under the ${answers.license} license.
  
  ## Contributing
  ${answers.contributing}
  
  ## Tests
  ${answers.tests}
  
  ## Questions
  For any questions or inquiries, please reach out to me via GitHub or email:
  * GitHub: [${answers.githubUsername}](https://github.com/${answers.githubUsername})
  * Email: ${answers.email}
  `;
  
    fs.writeFile('README.md', readmeContent, (err) => {
      if (err) throw err;
      console.log('README.md file has been created!');
    });
  }
  
  inquirer.prompt(questions).then((answers) => {
    writeREADME(answers);
  })
}

// Function call to initialize app
initializeApp()



