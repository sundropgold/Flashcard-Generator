// get basic card constructor
var BasicCard = require("./BasicCard.js");

// get cloze card constructor
var ClozeCard = require("./ClozeCard.js");

// inquirer
var inquirer = require("inquirer");

// store flashcards here
var usersFlashcards = [];

var randomUsed = [];
var random = Math.floor(Math.random() * usersFlashcards.length);


// TEST ////////////////////////////////////////

// var firstPresident = new BasicCard("Who was the first president of the United States?", "George Washington");

// // "Who was the first president of the United States?"
// console.log(firstPresident.front); 

// // "George Washington"
// console.log(firstPresident.back); 

// var firstPresidentCloze = new ClozeCard("George Washington was the first president of the United States.", "George Washington");

// // "George Washington"
// console.log(firstPresidentCloze.cloze); 

// // " ... was the first president of the United States."
// console.log(firstPresidentCloze.partial); 

// // "George Washington was the first president of the United States."
// console.log(firstPresidentCloze.fullText);

// // Should throw or log an error because "oops" doesn't appear in "This doesn't work"
// var brokenCloze = new ClozeCard("This doesn't work", "oops");

// usersFlashcards.push(firstPresident);
// usersFlashcards.push(firstPresidentCloze);
// console.log(usersFlashcards);
// console.log(usersFlashcards[1]);

// console.log("===========================");

//////////////////////////////////////////////////

var options = function() {
	// function to give user options: create cards or play cards

	inquirer.prompt([
		{
			type:"list",
			message:"Would you like to create flashcards or play with your flashcards?",
			choices:["Create", "Play", "Exit"],
			name:"option"	
		}
		]).then(function(user){

			if (user.option === "Create") {
				createCards();
			}

			else if (user.option === "Play") {
				if(usersFlashcards.length === 0) {
					console.log("Sorry, you don't have any flashcards to play with.")
					createCards();
				}
				else {
					playCards(usersFlashcards, random);					
				}
			}

			else if (user.option === "Exit") {
				console.log("Thank you for playing!");
			}

			else {
				console.log("This option is unavailable");

				options();
			}
		});
};

var createCards = function(){
	// function to create cards whenever called

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

						console.log("Your card has been created. Directing you back to options...");
						options();

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

						console.log("Your card has been created. Directing you back to options...");
						options();
					});
			}
		});
};

var playCards = function(cardArray, random){
	// function to play cards

	if (randomUsed.indexOf(random) == -1) {
		var randomCard = usersFlashcards[random];
		randomUsed.push(random);
	}
	else {
		while (randomUsed.indexOf(random) > -1) {
			random = Math.floor(Math.random() * usersFlashcards.length);
		}

		var randomCard = usersFlashcards[random];
		randomUsed.push(random);
	}
	

	// determine if card is basic card or cloze-deletion card
	if (randomCard.front) {
		// display question
		var randomQ = randomCard.front;
		console.log("Question: " + randomQ);

		// get answer
		var randomA = randomCard.back.toLowerCase();
		// console.log(randomA);

		inquirer.prompt([
			// let user answer
			{
				type:"input",
				message:"Type in your answer: ",
				name:"answered"
			}

			]).then(function(user){
				// check user's answer against the answer
				var userA = user.answered;

				if (userA.toLowerCase() == randomA) {
					// if correct - display correct msg
					console.log("CORRECT!!");

					nextOption();
				}

				else {
					// if incorrect - display incorrect msg
					console.log("INCORRECT!!");

					nextOption();
				}

			});
	
	}

	else if (randomCard.partial) {
		// display partial text
		var randomT = randomCard.partial;
		console.log("Fill in the blank: " + randomT);

		// get cloze
		var randomC = randomCard.cloze.toLowerCase();
		// console.log(randomC);

		inquirer.prompt([
		// let user answer
		{
			type:"input",
			message:"Type in your answer: ",
			name:"answered"
		}

		]).then(function(user){
			// check user's answer against the answer
			var userA = user.answered;

			if (userA.toLowerCase() == randomC) {
				// if correct - display correct msg
				console.log("CORRECT!!");

				nextOption();
			}

			else {
				// if incorrect - display incorrect msg
				console.log("INCORRECT!!");

				nextOption();
			}

		});
	}
};

var nextOption = function(){
		// after the user has finished answering

	inquirer.prompt([
		// give user options to continue playing? if not, then exit 
	{
		type:"confirm",
		message:"Would you like to continue playing?",
		name:"continue",
		default:true
	}
		]).then(function(user){

			if (user.continue === true) {
				playCards(usersFlashcards, random);
			}

			else {
				console.log("Thanks for playing!!");
			}
		});
	};

options();