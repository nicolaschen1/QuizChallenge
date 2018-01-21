/**********************
Filename: myscript.js
Author: Nicolas Chen
Version: 1.0
***********************/

var questions = [{
	question: "What is the capital of Australia?",
	choices: ["Cairns", "Wellington", "Canberra", "Gladstone"],
	correctAnswer: 2
}, {
	question: "What was the specificity of the Germanic God Thor?",
	choices: ["Strength", "Youth", "Rapidity", "The art of War"],
	correctAnswer: 0
}, {
	question: "Since when did the dinosaurs disappear from the surface of the Earth?",
	choices: ["40 million years", "65 million years", "35 million years", "70 million years"],
	correctAnswer: 1
}, {
	question: "What is the birthplace of Mozart?",
	choices: ["Vienna", "Salzburg", "Graz", "Stuttgart"],
	correctAnswer: 1
}, {
	question: "How many levels does the Richster scale have?",
	choices: ["6 levels", "8 levels", "9 levels", "10 levels"],
	correctAnswer: 2
}, {
	question: "What is the danger threshold for a human regarding noise?",
	choices: ["80 decibels", "90 decibels", "120 decibels", "150 decibels"],
	correctAnswer: 1
}, {
	question: "When did Gutenberg invent the printing press?",
	choices: ["Around 1400", "Around 1440", "Around 1450", "Around 1460"],
	correctAnswer: 0
}, {
	question: "What is the circumference of the Earth?",
	choices: ["12,800 km", "30,140 km", "35,060 km", "40,075 km"],
	correctAnswer: 3
}, {
	question: "How many inhabitants does the European Union have in 2010?",
	choices: ["About 500 million", "About 380 million", "About 600 million", "About 700 million"],
	correctAnswer: 0
}, {
	question: "How many liters of blood does the human body contain?",
	choices: ["4 liters", "8 liters", "5 liters", "3 liters"],
	correctAnswer: 2
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;
var countQuestions = 1;

$(document).ready(function () {
	displayCurrentQuestion();
	$(this).find(".warningMessage").hide();
	$(this).find(".choiceEnd").hide();

	$(this).find(".nextButton, .button").on("click", function(){	
		countQuestions++;
		if (!quizOver) {
			value = $("input[name='radioName']:checked").val();			
			if (value == undefined) {
				alert("Warning: Please select an answer before carrying on.");
				$(document).find(".warningMessage").text("Select an answer before going to the next question.");
				$(document).find(".warningMessage").show();
			} else {
				$(document).find(".warningMessage").hide();
				if (value == questions[currentQuestion].correctAnswer) {
					correctAnswers++;
				}
				currentQuestion++;
				if (currentQuestion  < questions.length) {
					displayCurrentQuestion();
				} else {
					displayScore();
					$(document).find(".nextButton").hide();
					$(document).find(".choiceEnd").show();	
					$(document).find(".button").show();					
					quizOver = true;
				}
			}
		} else {
			quizOver = false;
			$(document).find(".choiceEnd").hide();
			$(document).find(".nextButton").show();		
			$(document).find(".nextButton").text("Next Question");
			
			resetChallenge();
			countQuestions = 1;
			displayCurrentQuestion();
			hideScore();			
		}
	});
})

function displayCurrentQuestion() {
	console.log("In display current Question");

	var question = questions[currentQuestion].question;
	var questionClass = $(document).find(".quizContainer > .question");
	var choiceList = $(document).find(".quizContainer > .choiceList");
	var numChoices = questions[currentQuestion].choices.length;
	
	$(questionClass).text("Question " + countQuestions + ": " + question);

	//remove all current <li> elements
	$(choiceList).find("li").remove();

	var choice;
	for (i = 0; i < numChoices; i++) {
		choice = questions[currentQuestion].choices[i];

		//radio button dynamically
		$('<li><input type="radio" name="radioName" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
	}
} 

function resetChallenge() {
	currentQuestion = 0;
	correctAnswers = 0;
	hideScore();
}

function displayScore() {
	if (correctAnswers == questions.length) {
		alert("Well done! You are the new champion! :)"); 
	}

	$(document).find(".quizContainer > .result").text("Your score: " + correctAnswers + "/" + questions.length);
	$(document).find(".quizContainer > .result").show();	
}

function hideScore() {
	$(document).find(".result").hide();
}