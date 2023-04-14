#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'

const QUESTIONS = [
    {
      body: 'What is Node.js?',
      answers: [
        'A runtime environment for executing JavaScript outside the browser',
        'A front-end framework for building web applications',
        'A database management system for SQL databases',
        'A graphics library for creating animations'
      ]
    },
    {
      body: 'Which programming paradigm is JavaScript based on?',
      answers: [
        'Prototype-based object-oriented',
        'Class-based object-oriented',
        'Functional',
        'Procedural'
      ]
    },
    {
      body: 'What is the purpose of the "require" function in Node.js?',
      answers: [
        'To import external modules into a Node.js application',
        'To create a new instance of a JavaScript class',
        'To include a CSS stylesheet in an HTML document',
        'To load images and other binary files into a web page'
      ]
    },
    {
      body: 'What is the event loop in Node.js?',
      answers: [
        'A mechanism for handling asynchronous operations in a non-blocking way',
        'A data structure for storing and retrieving key-value pairs',
        'A debugging tool for analyzing runtime errors',
        'A system for managing network traffic in a web application'
      ]
    },
    {
      body: 'Which data types are supported by JavaScript?',
      answers: [
        'All of the above',
        'Boolean',
        'Number',
        'String'
      ]
    },
    {
      body: 'What is the difference between "==" and "===" in JavaScript?',
      answers: [
        'The former performs type coercion, while the latter does not',
        'The former is used for comparison, while the latter is used for assignment',
        'The former is a bitwise operator, while the latter is a logical operator',
        'There is no difference, they are interchangeable'
      ]
    },
    {
      body: 'What is a closure in JavaScript?',
      answers: [
        'A function that has access to variables in its lexical scope, even after the function has returned',
        'A method for encapsulating data and behavior within a single object',
        'A way to handle errors and exceptions in a JavaScript program',
        'A mechanism for managing memory allocation in a web browser'
      ]
    },
    {
      body: 'What is the purpose of the "this" keyword in JavaScript?',
      answers: [
        'To refer to the current object or function context',
        'To declare a new variable in the current scope',
        'To create a new instance of a JavaScript class',
        'To import external modules into a JavaScript application'
      ]
    },
    {
      body: 'Which statement is used to declare a variable in JavaScript?',
      answers: [
        'var',
        'let',
        'const',
        'all of the above'
      ]
    },
    {
      body: 'What is the purpose of the "async" and "await" keywords in JavaScript?',
      answers: [
        'To simplify the syntax for writing asynchronous code with promises',
        'To enable multi-threading in a JavaScript program',
        'To declare a function as a generator',
        'To declare a function as a constructor'
      ]
    }
  ];
  
 

//console.log(chalk.bgGreen('Greengo!'))

let playerName; 

const sleep = (ms = 1000) => new Promise((r)=>setTimeout(r,ms));

async function welcome(){
    const rainbowTitle = chalkAnimation.rainbow(
        `Who wants to ba a NodeJS Millionaire??? \n`
    );
    await sleep();
    rainbowTitle.stop(); 
    const welcomeMessage = `${chalk.bgBlue('How to play:')}
I am a process on your computer.
If you get any question wrong I will be ${chalk.bgBlack(chalk.red('killed'))}.
So get all the questions right...`
    for (let line of welcomeMessage.split('\n')){
        console.log(line);
        await sleep(900);
    }
}

async function askName(){
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: `What's your name?`,
        default() {
            return `Player`;
        }
    })
    playerName = answers.player_name;
    console.clear();
    await sleep();

}

async function Question(questionBody, answersArr, correctAnswerIndex=0, questionNumber=null){
    const questionName = `question_${questionNumber}`
    const correctAnswer = answersArr[correctAnswerIndex]
    const answers = await inquirer.prompt({
        name: questionName,
        type:'list',
        message: `${questionBody}`,
        choices: answersArr,
    });

    return handleAnswer(answers[questionName] === correctAnswer)
}

async function askQuestions(){
    let n = 0
    let maxN = QUESTIONS.length;
    for(let question of QUESTIONS){
        n++;
        console.log(`\n${n}/${maxN}`);
        await Question(question.body, question.answers, 0, n);
        await sleep();
        console.clear();
        
    }
    endMessage(true);
}

async function handleAnswer(isCorrect){
    const spinner =  createSpinner('Checking answer...').start();
    await sleep();

    if(isCorrect){
        spinner.success({text: `Nice work ${playerName}. That's a legit answer!`})
    } else {
        spinner.error({text: `☠️ Game over! You killed an innocent process...`});
        await endMessage(isCorrect);
        await sleep(2000);
        process.exit(1); 
    }
}

async function endMessage(didWin=false){
  await sleep();
  console.clear();
  let msg;
  if(didWin) msg = `Congrats ${playerName}!`
  else msg = `You're a looser!`

  figlet(
    msg,
    (err, data) => {
      console.log(gradient.pastel.multiline(data))
    }
  )
}

async function playGame(){

    await welcome();
    await askName();
    await askQuestions();
}
playGame();


