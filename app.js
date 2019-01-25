/* jshint esversion: 6 */

/*
 * Create a list that holds all of your cards
 */

// Card array holds all cards
const cards = ['fa-diamond', 'fa-diamond',
'fa-paper-plane-o', 'fa-paper-plane-o',
'fa-anchor', 'fa-anchor',
'fa-bolt', 'fa-bolt',
'fa-cube', 'fa-cube',
'fa-leaf', 'fa-leaf',
'fa-bomb', 'fa-bomb',
'fa-bicycle', 'fa-bicycle'];

//Create the cards
function createCard(card){
"use strict";
return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
	"use strict";
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//Generating cards dynamically with JavaScript. Shuffling cards.
function initializeGame() {
"use strict";
var deck = document.querySelector('.deck');

var cardHTML = shuffle(cards).map(function(card) {
return createCard(card);
});


deck.innerHTML = cardHTML.join('');
	
	
//Local variables
var fullCards = document.querySelectorAll('.card');
var flipCards = [];
var matchedCards = [];

//Set up event listener
fullCards.forEach(function(card) {
	card.addEventListener('click', function(e) {

		if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
		flipCards.push(card);
	    card.classList.add('open', 'show', 'disable');

			
			//Checking for a match
			if (flipCards.length === 2) {

				//Adding moves
				moves += 1;
				moveCounter.innerHTML = moves;

				

				if (flipCards[0].dataset.card === flipCards[1].dataset.card){

					//When Cards Match
					flipCards[0].classList.add('match');
					flipCards[1].classList.add('match');

					matchedCards.push(flipCards[0], flipCards[1]);

					flipCards = [];

					//Check all cards are matched and end game
					gameOver();

					//Stop timer
					//resetTimer();

					} else {

					//When there is no match, flip cards
					setTimeout(function() {
					flipCards.forEach(function(card){
					card.classList.remove('open','show','disable');
					});

					flipCards = [];
				}, 1000);
			}

				//Set Stars Rating
				starsRating();

		  }
		}
	});
});
	

	//When Player wins the game and the game is over, this happens.
	function gameOver(){
		let timekeeps = minute+ " mins  "+second+ " secs";
		//Define star rating for alert box here
	    let rating = 5;
	    function starsFound(rating){
		
	    if(moves >= 12){
		        rating = 5;
	            }
		
	    if(moves >= 16){
		        rating = 3;
	            }	
		
	    if(moves >= 18){
		        rating = 1;
	          }	
    }
		
   //Create alert here
	if(matchedCards.length === cards.length){
		alert("Congrats! You've won the game in " +timekeeps+ " time and with a " +rating+ " rating. Press 'OK' to play again.");
		console.log("I end the game!");
		clearInterval(time); 
		restartGame();
	}
		
		
  }
	
}

//Start Game
initializeGame();


//Adding move counter
var moveCounter = document.querySelector('.moves');
var moves = 0;
moveCounter.innerHTML = 0;
function moveCounter(){
	"use strict";
	moves++;
}


//Create Timer
let second = 0, minute = 0;
let timeStart = document.querySelector('.timekeeper');
timeStart.innerHTML = minute+ " mins  "+second+ " secs";

function timer(){
    if(moves > 0) {
		timeStart.innerHTML = minute+" mins "+second+" secs";
		second++;
		if(second === 60){
		   minute++;
			 second = 0;
		}
 }
}


//Starts the timer
let time = setInterval(function() {
  timer();
}, 1000);


//Reset timer
function resetTimer(){
	let timeStart = document.querySelector('.timekeeper');
    timeStart.innerHTML = "0 mins 0 secs";
	clearInterval(timer);
}

//Generate Stars
var stars = document.querySelector(".stars");
function starsRating(){
	"use strict";
	if(moves >= 12){
		stars.innerHTML = `<li><p class="rating">RATING: </p></li>
		                   <li><i class="fa fa-star"></i></li>
        		           <li><i class="fa fa-star"></i></li>
				           <li><i class="fa fa-star"></i></li>`;
	}

	if(moves >= 16){
		stars.innerHTML = `<li><p class="rating">RATING: </p></li>
		                   <li><i class="fa fa-star"></i></li>
        		           <li><i class="fa fa-star"></i></li>`;
	}

	if(moves >= 18){
		stars.innerHTML = `<li><p class="rating">RATING: </p></li>
		                   <li><i class="fa fa-star"></i>`;
	}

}

//Implementing game over message and function when all cards are matched.
var matchedCards = [];

//Implementing restart game Button
var deck = document.querySelector('.deck');
var restartButton;

restartButton = document.getElementById("restartB");
restartButton.addEventListener("click", restartGame);
console.log("event listener working");

function restartGame(){
	"use strict";
	console.log("I am also working");

	//Empty all cards array
	deck.innerHTML = "";
	console.log("I empty the cards");

	//Start New Game
	initializeGame();
    console.log("I re-start the game");

	//Reset variables
	matchedCards = [];

	//Reset Timer
	resetTimer();
	second = 0;
	minute = 0;

	//Reset Counter
	moves = 0;
	moveCounter.innerHTML = moves;

	//Reset Stars
	stars.innerHTML = `<li><p class="rating">RATING: </p></li>
	            <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
				<li><i class="fa fa-star"></i></li>
				<li><i class="fa fa-star"></i></li>
				<li><i class="fa fa-star"></i></li>`;

}
