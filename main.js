// get basic card constructor
var BasicCard = require("./BasicCard.js");

// get cloze card constructor
var ClozeCard = require("./ClozeCard.js");

// inquirer
var inquirer = require("inquirer");

// store flashcards here
var usersFlashcards = [];

// TEST ////////////////////////////////////////

var firstPresident = new BasicCard("Who was the first president of the United States?", "George Washington");

// "Who was the first president of the United States?"
console.log(firstPresident.front); 

// "George Washington"
console.log(firstPresident.back); 

var firstPresidentCloze = new ClozeCard("George Washington was the first president of the United States.", "George Washington");

// "George Washington"
console.log(firstPresidentCloze.cloze); 

// " ... was the first president of the United States."
console.log(firstPresidentCloze.partial); 

// "George Washington was the first president of the United States."
console.log(firstPresidentCloze.fullText);

// Should throw or log an error because "oops" doesn't appear in "This doesn't work"
var brokenCloze = new ClozeCard("This doesn't work", "oops");

//////////////////////////////////////////////////

inquirer.prompt([

	{
		type:"list",
		message:"Do you want to make a basic flashcard or a cloze-deleted flashcard?",
		choices:["basic", "cloze-deleted"],
		name:"cardtype"
	
	}
	]).then(function(user){

		if (user.cardtype === "basic") {

			inquirer.prompt([

					{
						type:"input",
						message:"Insert your flashcard's question here.",
						name:"question"
					},
					{
						type:"input",
						message:"Insert your flashcard's answer here.",
						name:"answer"
					}
				]).then(function(basic){

					var flashCard = new BasicCard(basic.question, basic.answer);

					usersFlashcards.push(flashCard);

				});

		}

		else if (user.cardtype === "cloze-deleted") {

			inquirer.prompt([

				{
					type:"input",
					message:"Insert your flashcard's full text here.",
					name:"text"	
				},
				{	
					type:"input",
					message:"Insert your flashcard's cloze-deletion here.",
					name:"cloze"
				}
				]).then(function(cd){

					var flashCard = new ClozeCard(cd.text, cd.cloze);
	
					usersFlashcards.push(flashCard);
				});
		}
	});