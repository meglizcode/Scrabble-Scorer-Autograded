// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 };
 
 // your job is to finish writing these functions and variables that we've named //
 // don't change the names or your program won't work as expected. //
 
 function initialPrompt() {   //Task:1 User inputs word
   console.log("Let's play some scrabble!");
   let word = input.question(`Enter a word: `); 
   return word;
};

// Task:2 New scoring algorithms
function simpleScorer(simpleScoreWord) {
   let score = simpleScoreWord.length;
   return score;
};

function vowelBonusScorer(vowelWordBonus) {
   vowelWordBonus = vowelWordBonus.toUpperCase();
   
   let score = 0
   const vowel = ['A','E','I','O','U',];
   
   for (let i = 0; i < vowelWordBonus.length; i++) {
      if (vowel.includes(vowelWordBonus[i])) {
         score += 3;
      } else {
         score++;
      }
   }
   return score;
};

//Original code declerations

let newPointStructure = transform(oldPointStructure)
function scrabbleScorer(word) {
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
		 if (word[i] in newPointStructure) {
			letterPoints += newPointStructure[word[i]];
      }
	}	
     return letterPoints;
};

let simpleScoreDetails = {
   name: 'Simple Score',
   description:'Each Letter is worth 1 point.',
   scorerFunction: simpleScorer,
};

let bonusVowelDetails = {
   name: 'Bonus Vowels',
   description:'Vowels are 3 pts, consonants are 1 pt.',
   scorerFunction: vowelBonusScorer,
};

let classicScrabbleDetails = {
   name: 'Scrabble',
   description:'The traditional scoring algorithm.',
   scorerFunction: scrabbleScorer,
};

// Task 2:Object Array with fuction detials
const scoringAlgorithms = [simpleScoreDetails,bonusVowelDetails,classicScrabbleDetails]

function scorerPrompt() {
   console.log(`\nThe following options are different ways your word can be scored.\nPlease use a number to make a following selection. \n\n 0: ${simpleScoreDetails.name} : ${simpleScoreDetails.description} \n 1: ${bonusVowelDetails.name}: ${bonusVowelDetails.description}\n 2: ${classicScrabbleDetails.name}: ${classicScrabbleDetails.description} \n`)
   let selection = input.question('Enter 0, 1, or 2: ')
   let scorerSelection;
      if (selection === '0')
      scorerSelection = scoringAlgorithms[0]
   else if (selection === '1')
      scorerSelection = scoringAlgorithms[1]
   else if (selection === '2')
      scorerSelection = scoringAlgorithms[2]
   
   return scorerSelection;
}


function transform(oldPointStructure) 
{
   let newPointScore = {};

   for (let key in oldPointStructure) { 
      let letterKeys = oldPointStructure[key]

    for (let i = 0; i < letterKeys.length; i++){
      let littleLetter = letterKeys[i].toLowerCase();
      newPointScore[littleLetter] = Number(key)
    }
  } return newPointScore
};

function runProgram() {
   let userInputedWord = initialPrompt();

   let scorerChoice = scorerPrompt();
   let finalScore = scorerChoice.scorerFunction(userInputedWord)
   //scorerChoice is an object
   console.log(`Score for '${userInputedWord}': ${finalScore}`);
   
};

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};